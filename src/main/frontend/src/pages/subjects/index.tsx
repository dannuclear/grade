import { SubjectDialog, SubjectTable } from "@features/subjects/ui"
import { GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

const SubjectListPage = () => {
    const [subjectId, setSubjectId] = useState<number | "new" | null>(null)
    const [reload, setReload] = useState<boolean>(false)

    const onEdit = (id: GridRowId) => {
        setSubjectId(id as number)
    }

    const onAdd = () => {
        setSubjectId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete subject: ${id}`)
    }

    const onCancel = () => {
        setSubjectId(null)
    }

    const onSettled = () => {
        setSubjectId(null)
        setReload(e => !e)
    }

    const onError = () => {

    }

    return (<>
        <SubjectTable onAdd={onAdd} onEdit={onEdit} reload={reload} onDelete={onDelete} />
        <SubjectDialog subjectId={subjectId} open={!!subjectId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { SubjectListPage as Component }

