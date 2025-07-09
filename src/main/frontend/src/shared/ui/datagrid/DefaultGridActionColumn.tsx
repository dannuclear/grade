import { GridActionsCellItem, GridActionsColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import { DefaultIcon } from '../DefaultIcon';

export interface DefaultGridActionColDef extends Omit<GridBaseColDef, 'field'> {
  onEdit?: (id: GridRowId) => void,
  onDelete?: (id: GridRowId) => void
}

export const DefaultGridActionColumn = ({ onEdit, onDelete, ...props }: DefaultGridActionColDef): GridActionsColDef => {
  return (
    {
      ...props,
      field: 'actions',
      type: 'actions',
      getActions: ({ id }: GridRowParams) => [
        onEdit && <GridActionsCellItem icon={<DefaultIcon iconName='fa-pencil' />} label='Изменить' onClick={() => onEdit(id)} color='primary' size='medium' />,
        onDelete && <GridActionsCellItem icon={<DefaultIcon iconName='fa-trash' />} label='Удалить' onClick={() => onDelete(id)} color='primary' size='medium' />,
      ].filter(el => !!el)
    }
  )
}
