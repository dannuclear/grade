import type { } from '@mui/x-data-grid/themeAugmentation';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '../assets/css/all.min.css';
import router from './router.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)