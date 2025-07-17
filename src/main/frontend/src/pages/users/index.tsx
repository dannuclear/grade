import { UserDialog, UserTable } from "@features/users"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const UserListPage = () => {
    const [userId, setUserId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

    const onEdit = (id: GridRowId) => {
        setUserId(id as number)
    }

    const onAdd = () => {
        setUserId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete user: ${id}`)
    }

    const onCancel = () => {
        setUserId(null)
    }

    const onSuccess = () => {
        setUserId(null)
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/users"))
    }
    return (
        <>
            <UserTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
            <UserDialog userId={userId} open={!!userId} onCancel={onCancel} onSuccess={onSuccess} />
        </>
    )
}

export { UserListPage as Component }

