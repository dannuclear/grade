import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { userApi } from '../../api/api'
import { current } from '../../store/userSlice'
import { Header } from './Header'

export const Layout = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: any) => state.user.isLoading)
    useEffect(() => {
        userApi.current().then(data => {
            const user = {
                name: data.name,
                organization: data.principal?.organization?.name??'Организация не определена',
                authorities: data.authorities?.map((a: { authority: string }) => a.authority)
            }
            dispatch(current(user))
        })
    }, [])

    if (isLoading)
        return <Typography variant='h4'>Проверяем данные пользователя...</Typography>
    return (
        <>
            <Header />
            <Box padding={1}>
                <Outlet />
            </Box>
        </>
    )
}
