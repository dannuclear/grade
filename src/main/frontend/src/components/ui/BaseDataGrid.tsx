import { DataGrid, DataGridProps, GridRowId } from '@mui/x-data-grid'
import { DefaultGridActionColumn } from './DefaultGridActionColumn'

export interface BaseDataGridProps extends DataGridProps {
    onEdit?: (id: GridRowId) => void,
    onDelete?: (id: GridRowId) => void,
}

export const BaseDataGrid = ({ onEdit, onDelete, columns, ...props }: BaseDataGridProps) => {
    const defaultActionColumn = DefaultGridActionColumn({ onEdit, onDelete })

    return (
        <DataGrid
            {...props}
            columns={[...columns, defaultActionColumn]}
        />
    )
}
