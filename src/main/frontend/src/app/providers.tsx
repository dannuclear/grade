import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { queryClient } from '../shared/api/query-client'
import { store } from '../store'
import { theme } from './theme'

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        </ThemeProvider >
    );
}
