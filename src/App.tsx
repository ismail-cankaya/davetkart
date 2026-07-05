import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';

// Pages beyond the landing load as separate chunks (FCP optimization).
const CreatePage = React.lazy(() => import('./pages/CreatePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const InvitePage = React.lazy(() => import('./pages/InvitePage'));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/create', element: <CreatePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    // Guest-facing invitation: rendered chrome-free outside the AppLayout.
    path: '/invite/:id',
    element: (
      <React.Suspense fallback={<div className="h-dvh w-full bg-emerald-950" />}>
        <InvitePage />
      </React.Suspense>
    )
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
