import { ruRU } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import './assets/css/all.min.css';
import router from './router/router.tsx';


const theme = createTheme({
  palette: {
    mode: 'light'
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
        size: 'small'
      }
    },
    MuiDataGrid: {
      defaultProps: {
        density: 'compact',
        disableColumnMenu: true,
        showCellVerticalBorder: true,
        rowSelection: false,
        autoHeight: true,
        slotProps: {
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress'
          }
        }
      }
    }
  }
}, ruRU)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark" />
    </ThemeProvider>
  </StrictMode>,
)
