import { PersonDialog, PersonTable } from "@features/person/ui"
import { GridRowId } from "@mui/x-data-grid"
import { useState } from "react"


const PersonListPage = () => {
    const [personId, setPersonId] = useState<number | null>(null)

    const onEdit = (id: GridRowId) => {
        setPersonId(id as number)
    }

    const onOk = () => {
        setPersonId(null)
    }

    const onCancel = () => {
        setPersonId(null)
    }

    const onSuccess = () => {

    }

    const onError = () => {

    }

    return (<>
        <PersonTable onEdit={onEdit} />
        <PersonDialog personId={personId} open={!!personId} onOk={onOk} onCancel={onCancel} onSuccess={onSuccess} onError={onError} />
    </>)
}

export { PersonListPage as Component }

