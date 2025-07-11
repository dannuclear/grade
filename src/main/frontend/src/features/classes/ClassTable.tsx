import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"

const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Наименование", width: 150 },
    { field: " ", headerName: "", flex: 1 },
]

export const ClassTable = ({ ...props }: Omit<ServerDataGridProps, "path" | "columns">) => {
    return (
        <ServerDataGrid {...props} path="/api/v1/groups" columns={columns} />
    )
}
