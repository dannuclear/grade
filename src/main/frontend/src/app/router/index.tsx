import { createBrowserRouter, redirect } from 'react-router'
import { ROUTES } from '../../shared/routes'
import { App } from '../App'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.ROOT,
        loader: () => redirect(ROUTES.HOME)
      },
      {
        path: ROUTES.PERSONS,
        lazy: () => import("@pages/students")
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@pages/login")
      },
      {
        path: ROUTES.CLASSES,
        lazy: () => import("@pages/classes")
      },
      {
        path: ROUTES.USERS,
        lazy: () => import("@pages/users")
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@pages/home")
      },
      {
        path: ROUTES.SUBJECTS,
        lazy: () => import("@pages/subjects")
      },
      {
        path: ROUTES.TEACHERS,
        lazy: () => import("@pages/teachers")
      },
      {
        path: ROUTES.GRADES,
        lazy: () => import("@pages/grades")
      }
    ]
  }
], { basename: import.meta.env.BASE_URL })

export { router }

