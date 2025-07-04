import { ruRU } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';
import '../assets/css/all.min.css';

export const theme = createTheme({
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