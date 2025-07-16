import { GridColDef } from "@mui/x-data-grid"
import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Имя пользователя", width: 150 },
    { field: "firstname", headerName: "name", width: 150 },
    { field: "isActive", headerName: "Разрешен", headerAlign: "center", align: "center", sortable: false, valueGetter: (value, _row) => (value ? "Да" : "Нет") },
    { field: "tgUsername", headerName: "Telegram имя", headerAlign: "center", align: "center", sortable: false, width: 150 },
    { field: "null", headerName: "", flex: 1 },
]

export const UserTable = ({ ...props }: Omit<ServerDataGridProps, "path" | "columns">) => {
    return (
        <ServerDataGrid {...props} path="/api/v1/users" columns={columns} />
    )
}
