import { TeacherDialog, TeacherTable } from "@features/teacher/ui"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const TeacherListPage = () => {
    const [teacherId, setTeacherId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

    const onEdit = (id: GridRowId) => {
        setTeacherId(id as number)
    }

    const onAdd = () => {
        setTeacherId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete teacher: ${id}`)
    }

    const onCancel = () => {
        setTeacherId(null)
    }

    const onSettled = () => {
        setTeacherId(null)
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/teachers"))
    }

    const onError = () => {

    }

    return (<>
        <TeacherTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
        <TeacherDialog teacherId={teacherId} open={!!teacherId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { TeacherListPage as Component }

