import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Hash routing so deep links work on GitHub Pages, which has no server-side rewrites.
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './ui/Layout';
import { Home } from './ui/screens/Home';
import { Diagrams } from './ui/screens/Diagrams';

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/diagrams', element: <Diagrams /> },
      // Audio libraries are large; load this screen only when it is opened.
      { path: '/input', lazy: () => import('./ui/screens/InputLab').then((m) => ({ Component: m.InputLab })) },
      { path: '*', element: <Home /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
