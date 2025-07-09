import type { } from '@mui/x-data-grid/themeAugmentation';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import { theme } from './styles';
import { queryClient } from '../shared/api/query-client';
import { store } from './store';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers theme={theme} queryClient={queryClient} store={store} router={router}></Providers>
  </StrictMode>,
)