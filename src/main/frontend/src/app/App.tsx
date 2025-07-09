import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Header } from '../features/layout/ui/Header'

export function App() {
  // const isLoading = useSelector((state: any) => state.user.isLoading)
  // useEffect(() => {
  // userApi.current().then(data => {
  //     const user = {
  //         name: data.name,
  //         organization: data.principal?.organization?.name??'Организация не определена',
  //         authorities: data.authorities?.map((a: { authority: string }) => a.authority)
  //     }
  //     dispatch(current(user))
  // })
  // }, [])

  // if (isLoading)
  //   return <Typography variant='h4'>Проверяем данные пользователя...</Typography>

  return (
    <>
      <Header />
      <Box sx={{ paddingTop: 1 }}>
        <Outlet />
      </Box>
    </>
  )
}
