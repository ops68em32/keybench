import { NavLink, Outlet } from 'react-router-dom';

const tab = ({ isActive }: { isActive: boolean }) =>
  `px-2.5 py-2 rounded-md text-[15px] ${isActive ? 'bg-soft text-ink font-semibold' : 'text-muted'}`;

export function Layout() {
  return (
    <div className="mx-auto min-h-dvh max-w-[760px] px-4 pb-16 pt-[max(16px,env(safe-area-inset-top))]">
      <header className="mb-6 flex items-center justify-between gap-3 border-b border-rule pb-3">
        <NavLink to="/" className="font-serif text-2xl text-ink no-underline">
          Keybench
        </NavLink>
        <nav className="flex gap-1">
          <NavLink to="/" end className={tab}>
            Home
          </NavLink>
          <NavLink to="/diagrams" className={tab}>
            Diagrams
          </NavLink>
          <NavLink to="/input" className={tab}>
            Input
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
