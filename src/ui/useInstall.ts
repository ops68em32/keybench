import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type InstallState =
  | { kind: 'installed' }
  | { kind: 'can-prompt'; install: () => Promise<void> }
  | { kind: 'ios' }
  | { kind: 'manual' };

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/** Whether the app is installed, and how to install it on this device if not. */
export function useInstall(): InstallState {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return { kind: 'installed' };
  if (deferred)
    return {
      kind: 'can-prompt',
      install: async () => {
        await deferred.prompt();
        const { outcome } = await deferred.userChoice;
        if (outcome === 'accepted') setInstalled(true);
        setDeferred(null);
      },
    };
  return isIos() ? { kind: 'ios' } : { kind: 'manual' };
}

/** True once a service worker controls the page, i.e. the app will open offline. */
export function useOfflineReady(): boolean {
  const [ready, setReady] = useState(() => !!navigator.serviceWorker?.controller);
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const sw = navigator.serviceWorker;
    // "ready" resolves once the worker is active, which is after it has cached the app.
    sw.ready.then(() => setReady(true));
    const onChange = () => setReady(true);
    sw.addEventListener('controllerchange', onChange);
    return () => sw.removeEventListener('controllerchange', onChange);
  }, []);
  return ready;
}
