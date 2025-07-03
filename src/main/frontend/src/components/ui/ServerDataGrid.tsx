import { GridFilterModel, GridPaginationModel, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { instance as axios } from '../../api/axios';
import { BaseDataGrid, BaseDataGridProps } from './BaseDataGrid';
import { DefaultGridToolbar } from './DefaultGridToolbar';

export interface ServerDataGridProps extends Omit<BaseDataGridProps, 'rows'> {
    path: string,
    extraParams?: Object,
    reload?: boolean,
    onAdd?: () => void,
    onEdit?: (id: GridRowId) => void,
    onDelete?: (id: GridRowId) => void
}

export const ServerDataGrid = ({ path, extraParams, onAdd, reload, ...props }: ServerDataGridProps) => {

    const [pageState, setPageState] = useState<{ isLoading: boolean, rowCount: number }>({ isLoading: false, rowCount: 0 })
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
    const [rows, setRows] = useState<any>([])
    const [errorCounter, setErrorCounter] = useState(0)

    useEffect(() => {
        if (errorCounter > 3)
            return;
        setPageState(prev => ({ ...prev, isLoading: true }))
        const search = filterModel.quickFilterValues?.length ? filterModel.quickFilterValues[0] : undefined;
        axios.get(path, { params: { page: paginationModel.page, size: paginationModel.pageSize, search, ...extraParams } })
            .then(response => {
                setRows(response.data?.content);
                setPageState({ isLoading: false, rowCount: response.data?.totalElements ?? 0 });
                setErrorCounter(0)
            })
            .catch(err => {
                setRows([]);
                setPageState({ isLoading: false, rowCount: 0 });
                toast.error(err.message);
                setErrorCounter(prev => prev + 1)
            })

    }, [paginationModel, extraParams, filterModel, reload])

    return (
        <BaseDataGrid
            rows={rows}
            loading={pageState.isLoading}
            rowCount={pageState.rowCount}

            // Фильтрация
            filterMode='server'
            filterModel={filterModel}
            onFilterModelChange={setFilterModel}

            // Пагинация
            paginationMode='server'
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 40, 100]}

            // Слоты
            slots={{
                toolbar: DefaultGridToolbar
            }}
            slotProps={{
                toolbar: {
                    onAdd
                }
            }}

            {...props}
        />
    )
}
