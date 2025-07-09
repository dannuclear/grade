import { GridRowId } from "@mui/x-data-grid"
import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "Имя", width: 150 },
    { field: "surname", headerName: "Фамилия", width: 150 },
    { field: "patronymic", headerName: "Отчество", width: 150 },
    { field: " ", headerName: "", width: 500 },
]

export const PersonTable = ({ onEdit }: Omit<ServerDataGridProps, "path" | "columns">) => {
    const onAdd = () => {
        console.log('add user')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete person: ${id}`)
    }

    return (
        <ServerDataGrid path="/api/v1/persons" columns={columns} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
    )
}
