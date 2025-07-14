import { ClassDialog, ClassTable } from "@features/classes"
import { GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

const ClassListPage = () => {
    const [classId, setClassId] = useState<number | "new" | null>(null)
    const [reload, setReload] = useState<boolean>(false)

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
        setReload(e => !e)
    }

    const onError = () => {

    }

    return (<>
        <ClassTable onAdd={onAdd} onEdit={onEdit} reload={reload} onDelete={onDelete} />
        <ClassDialog classId={classId} open={!!classId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { ClassListPage as Component }

