import { PersonDialog, PersonTable } from "@features/person/ui"
import { GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

const PersonListPage = () => {
    const [personId, setPersonId] = useState<number | "new" | null>(null)
    const [reload, setReload] = useState<boolean>(false)

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
        setReload(e => !e)
    }

    const onError = () => {

    }

    return (<>
        <PersonTable onAdd={onAdd} onEdit={onEdit} reload={reload} onDelete={onDelete} />
        <PersonDialog personId={personId} open={!!personId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
    </>)
}

export { PersonListPage as Component }

