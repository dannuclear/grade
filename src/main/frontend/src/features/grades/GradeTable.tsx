import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { rqClient } from "@shared/api/instance";

const SvgText = ({ text }: { text?: string }) => {
    return (<svg width="20" height="80" viewBox="0 0 100 100">
        <text
            x="50"
            y="50"
            fontSize="70px"
            transform="rotate(-90, 50, 50)"
            textAnchor="middle"
            dominantBaseline="middle">{text}</text>
    </svg>)
}

const columns: GridColDef[] = [
    { field: "fullName", headerName: "ФИО", width: 200, headerAlign: "center", sortable: false, resizable: false },
    { field: "01.02.2025", headerName: "01.02.2025", width: 30, renderHeader: (p) => <SvgText text={p.colDef.headerName} />, sortable: false, headerAlign: "center", resizable: false, align: "center" },
    { field: "02.02.2025", headerName: "02.02.2025", width: 30, renderHeader: (p) => <SvgText text={p.colDef.headerName} />, sortable: false, headerAlign: "center", resizable: false, align: "center" }
]

const rows = [
    {
        "id": 1,
        "fullName": "Иванов Иван Иванович",
        "01.02.2025": 2
    },
    {
        "id": 2,
        "fullName": "Петров Ветр Петрович",
        "02.02.2025": 3
    },
]
export const GradeTable = ({ ...props }: Omit<DataGridProps, "columns">) => {
    // const { data, isPending } = rqClient.useQuery("get", "/api/v1/grades")

    // calcColumns = [...columns, data?.content.]
    return (
        <DataGrid {...props} rows={rows} columns={columns} columnHeaderHeight={130}></DataGrid>
    )
}
