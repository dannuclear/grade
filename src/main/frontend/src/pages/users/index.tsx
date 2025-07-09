import { ServerDataGrid } from "@shared/ui"

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Имя пользователя", width: 150 },
    { field: "name", headerName: "name", width: 150 },
]

const UserListPage = () => {
    const onAdd = () => {
        console.log('add user')
    }

    return (
        <ServerDataGrid path="/api/v1/users" columns={columns} onAdd={onAdd}/>
    )
}

export { UserListPage as Component }

