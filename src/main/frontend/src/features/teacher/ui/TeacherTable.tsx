import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"

const columns = [
    { field: "surname", headerName: "Фамилия", width: 150 },
    { field: "firstname", headerName: "Имя", width: 150 },
    { field: "patronymic", headerName: "Отчество", width: 150 },
    { field: "birthday", headerName: "Дата рождения", width: 150 },
    { field: " ", headerName: "", flex: 1},
]

export const TeacherTable = ({ ...props }: Omit<ServerDataGridProps, "path" | "columns">) => {
    return (
        <ServerDataGrid {...props} path="/api/v1/teachers" columns={columns} />
    )
}
