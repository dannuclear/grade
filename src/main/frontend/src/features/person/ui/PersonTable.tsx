import { Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { ROUTES } from "@shared/routes"
import { ServerDataGrid } from "@shared/ui"
import { ServerDataGridProps } from "@shared/ui/datagrid/ServerDataGrid"
import { Link } from "react-router"

const columns: GridColDef[] = [
    { field: "surname", headerName: "Фамилия", width: 150 },
    { field: "firstname", headerName: "Имя", width: 150 },
    { field: "patronymic", headerName: "Отчество", width: 150 },
    { field: "birthday", headerName: "Дата рождения", width: 150 },
    { field: "groupName", headerName: "Группа/Класс", width: 150 },

    { field: "null", headerName: "", flex: 1 },
    {
        field: " ", headerName: "Оценки", renderCell(params) {
            return <Link to={{ pathname: ROUTES.GRADES, search: `?studentId=${params.id}` }}><Button>Оценки</Button></Link>
        },
    },
]

export const PersonTable = ({ ...props }: Omit<ServerDataGridProps, "path" | "columns">) => {
    return (
        <ServerDataGrid {...props} path="/api/v1/persons" columns={columns} />
    )
}
