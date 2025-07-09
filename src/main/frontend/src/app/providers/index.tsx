import { Theme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider, ProviderProps } from 'react-redux'
import { RouterProvider, RouterProviderProps } from 'react-router'
import { Toasts } from '../message'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
    router: RouterProviderProps['router'],
    theme: Theme,
    store: ProviderProps['store']
    queryClient: QueryClient
}

export function Providers({ router, theme, store, queryClient }: Readonly<Props>) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toasts />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </Provider>
        </ThemeProvider >
    );
}
