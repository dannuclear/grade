import { SubjectDialog, SubjectTable } from "@features/subjects/ui"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const SubjectListPage = () => {
    const [subjectId, setSubjectId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

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
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/subjects"))
    }

    const onError = () => {

    }

    return (<>
        <SubjectTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
        <SubjectDialog subjectId={subjectId} open={!!subjectId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { SubjectListPage as Component }

