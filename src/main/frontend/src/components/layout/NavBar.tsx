import { AppBar, Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { DefaultIcon } from "../ui/DefaultIcon"

const items = [
    {
        label: 'Журнал заявлений',
        icon: 'fa-bells',
        navigate: '/claims',
        roles: [],
    },
    // {
    //     label: 'Справочники',
    //     icon: 'fa-cubes',
    //     roles: [],
    //     items: [
    //         {
    //             label: 'Справочник заявлений',
    //             icon: 'fa-shuffle'
    //         }
    //     ]
    // },
    {
        label: 'Администрирование',
        icon: 'fa-cubes',
        roles: ['ADMIN'],
        items: [
            {
                label: 'Пользователи',
                icon: 'fa-shuffle',
                navigate: '/users',
                roles: [],
            }
        ]
    }
]

const NavButton = ({ label, icon, onClick }: any) => <Button startIcon={<i className={'fa-light ' + icon} />} onClick={onClick} sx={{ color: 'inherit' }}>{label}</Button>

export const NavBar = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user.current)

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [menuItems, setMenuItems] = useState([])

    const onClose = () => setAnchorEl(null)

    const onNavClick = (item: any, event: React.MouseEvent<HTMLElement>) => {
        if (item.navigate) {
            navigate(item.navigate);
            setAnchorEl(null);
        }
        else {
            setAnchorEl(event.currentTarget);
            setMenuItems(item.items ?? []);
        }
    }

    return (
        <>
            <AppBar position='static'>
                {<Toolbar variant='dense'>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit' sx={{ mr: 2 }}>
                        <DefaultIcon iconName='fa-layer-group' />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                        {items.map((item, idx) => ((item.roles.length == 0) || user.authorities.includes(item.roles[0])) && <NavButton key={idx} onClick={(e: React.MouseEvent<HTMLElement>) => onNavClick(item, e)} {...item} />)}
                    </Box>

                    <Box sx={{ textAlign: "end"}}>
                        <Typography>{user.name}</Typography>
                        <Typography variant="caption">{user.organization}</Typography>
                    </Box>
                </Toolbar>}

            </AppBar>
            <Menu anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClose}>

                {menuItems.map((item: any, idx: number) => <MenuItem key={idx} onClick={(e: React.MouseEvent<HTMLElement>) => onNavClick(item, e)}>
                    <ListItemIcon>
                        <DefaultIcon iconName={item.icon} />
                    </ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                </MenuItem>)}
            </Menu>
        </>
    )
}
