import { Box, Button } from '@mui/material'
import { GridSlotsComponentsProps, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { MouseEventHandler } from 'react'

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        onAdd?: MouseEventHandler,
        labelAdd: string
    }
}

export const DefaultGridToolbar = ({ onAdd, labelAdd = 'Создать' }: NonNullable<GridSlotsComponentsProps['toolbar']>) => {
    return (
        <GridToolbarContainer>
            {onAdd && <Button onClick={onAdd}>{labelAdd}</Button>}
            <Box sx={{ flex: 1 }}></Box>
            <GridToolbarQuickFilter debounceMs={500} sx={{ width: '20%' }} placeholder='Поиск...' />
        </GridToolbarContainer>
    )
}
