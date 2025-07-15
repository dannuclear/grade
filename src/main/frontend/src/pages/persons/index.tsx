import { PersonDialog, PersonTable } from "@features/person/ui"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const PersonListPage = () => {
    const [personId, setPersonId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

    const onEdit = (id: GridRowId) => {
        setPersonId(id as number)
    }

    const onAdd = () => {
        setPersonId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete person: ${id}`)
    }

    const onCancel = () => {
        setPersonId(null)
    }

    const onSettled = () => {
        setPersonId(null)
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/persons"))
    }

    const onError = () => {

    }

    return (<>
        <PersonTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
        <PersonDialog personId={personId} open={!!personId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { PersonListPage as Component }

