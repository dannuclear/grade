import { createBrowserRouter } from 'react-router'
import { Layout } from '../components/layout/Layout'
// import { Claims } from '../components/pages/Claims'
// import { Home } from '../components/pages/Home'
// import { Users } from '../components/pages/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '',
      //   element: <Home />,
      //   index: true
      // },
      // {
      //   path: 'claims',
      //   element: <Claims />,
      // },
      // {
      //   path: 'users',
      //   element: <Users />,
      // }
    ]
  }
], {basename: import.meta.env.BASE_URL})

export default router