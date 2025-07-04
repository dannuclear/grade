import { createBrowserRouter, redirect } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { ROUTES } from '../shared/routes'
import { App } from './App'
import { Providers } from './providers'

const router = createBrowserRouter([
  {
    element:
      <Providers>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          theme="dark" />
      </Providers>,
    children: [
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.PERSONS)
      },
      {
        path: ROUTES.PERSONS,
        lazy: () => import("../pages/persons/person.page")
      },
      {
        path: ROUTES.CLASSES,
        lazy: () => import("../pages/classes/class.page")
      }
    ]
  }
], { basename: import.meta.env.BASE_URL })

export default router