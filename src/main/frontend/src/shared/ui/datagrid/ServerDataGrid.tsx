import { GridFilterModel, GridPaginationModel, GridRowId } from '@mui/x-data-grid';
import { rqClient } from '@shared/api/instance';
import { keepPreviousData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BaseDataGrid, BaseDataGridProps } from './BaseDataGrid';
import { DefaultGridToolbar } from './DefaultGridToolbar';

export interface ServerDataGridProps extends Omit<BaseDataGridProps, 'rows'> {
    path: "/api/v1/users" | "/api/v1/persons" | "/api/v1/groups" | "/api/v1/teachers" | "/api/v1/subjects",
    extraParams?: Object,
    reload?: boolean,
    onAdd?: () => void,
    onEdit?: (id: GridRowId) => void,
    onDelete?: (id: GridRowId) => void
}

export const ServerDataGrid = ({ path, extraParams, onAdd, reload, ...props }: ServerDataGridProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
    const { data, isPending, isError, error, refetch } = rqClient.useQuery("get", path,
        {
            params:
            {
                query:
                {
                    page: paginationModel.page,
                    size: paginationModel.pageSize,
                    sort: ['id'],
                    q: filterModel.quickFilterValues?.length ? filterModel.quickFilterValues[0] : undefined
                }
            }
        }, { placeholderData: keepPreviousData })

    useEffect(() => {
        refetch()
    }, [reload])

    if (isError)
        toast.error("Ошибка при запросе: " + error)

    return (
        <BaseDataGrid
            rows={data?.content ?? []}
            loading={isPending}
            rowCount={data?.page?.totalElements ?? 0}

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
                    onAdd,
                }
            }}
            showToolbar

            {...props}
        />
    )
}
