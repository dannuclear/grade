import { TeacherDialog, TeacherTable } from "@features/teacher/ui"
import { GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

const TeacherListPage = () => {
    const [teacherId, setTeacherId] = useState<number | "new" | null>(null)
    const [reload, setReload] = useState<boolean>(false)

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
        setReload(e => !e)
    }

    const onError = () => {

    }

    return (<>
        <TeacherTable onAdd={onAdd} onEdit={onEdit} reload={reload} onDelete={onDelete} />
        <TeacherDialog teacherId={teacherId} open={!!teacherId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { TeacherListPage as Component }

