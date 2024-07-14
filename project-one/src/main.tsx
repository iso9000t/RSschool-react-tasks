import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/main" />
  },
  {
    path: '/main',
    element: <App />,
    errorElement: <NotFound/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
