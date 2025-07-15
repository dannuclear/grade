import { ClassDialog, ClassTable } from "@features/classes"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const ClassListPage = () => {
    const [classId, setClassId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

    const onEdit = (id: GridRowId) => {
        setClassId(id as number)
    }

    const onAdd = () => {
        setClassId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete class: ${id}`)
    }

    const onCancel = () => {
        setClassId(null)
    }

    const onSettled = () => {
        setClassId(null)
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/groups"))
    }

    const onError = () => {

    }

    return (<>
        <ClassTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
        <ClassDialog classId={classId} open={!!classId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { ClassListPage as Component }

