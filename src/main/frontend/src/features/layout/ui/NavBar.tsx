import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { AppBar, Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { ROUTES } from "@shared/routes"
import { DefaultIcon } from "@shared/ui"
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const items = [
    {
        label: 'Журнал учащихся',
        icon: 'fa-people-simple',
        navigate: ROUTES.PERSONS,
        roles: [],
    },
    {
        label: 'Справочники',
        icon: 'fa-layer-group',
        roles: [],
        items: [
            {
                label: 'Классы/Группы',
                icon: 'fa-people-group',
                navigate: ROUTES.CLASSES
            },
            {
                label: 'Предметы',
                icon: 'fa-flask',
                navigate: ROUTES.SUBJECTS
            }
        ]
    },
    {
        label: 'Администрирование',
        icon: 'fa-gears',
        roles: [],
        items: [
            {
                label: 'Пользователи',
                icon: 'fa-users',
                navigate: ROUTES.USERS,
                roles: [],
            }
        ]
    }
]

const NavButton = ({ label, icon, onClick, items }: any) => <Button startIcon={<DefaultIcon iconName={icon} />} onClick={onClick} sx={{ color: 'inherit' }} endIcon={items && <KeyboardArrowDownIcon />}>{label}</Button>

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
                        color='inherit' sx={{ mr: 2 }} onClick={() => navigate(ROUTES.HOME)}>
                        <DefaultIcon iconName='fa-user-graduate' />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                        {items.map((item, idx) => ((item.roles.length == 0) || user.authorities.includes(item.roles[0])) && <NavButton key={idx} onClick={(e: React.MouseEvent<HTMLElement>) => onNavClick(item, e)} {...item} />)}
                    </Box>

                    <Box sx={{ textAlign: "end" }}>
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
