import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"

const columns = [
    { field: "name", headerName: "Наименование", width: 150 },
    { field: " ", headerName: "", flex: 1},
]

export const SubjectTable = ({ ...props }: Omit<ServerDataGridProps, "path" | "columns">) => {
    return (
        <ServerDataGrid {...props} path="/api/v1/subjects" columns={columns} />
    )
}
