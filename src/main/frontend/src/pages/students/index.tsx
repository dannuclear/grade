import { ClassAutocomplete } from "@features/classes"
import { StudentDialog, StudentTable } from "@features/students/ui"
import { Grid } from "@mui/material"
import { GridRowId } from "@mui/x-data-grid"
import { rqClient } from "@shared/api/instance"
import { ApiComponents } from "@shared/api/schema"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const StudentListPage = () => {
    const [group, setGroup] = useState<ApiComponents["schemas"]["Group"]>()
    const [studentId, setStudentId] = useState<number | "new" | null>(null)
    const queryClient = useQueryClient()

    const onEdit = (id: GridRowId) => {
        setStudentId(id as number)
    }

    const onAdd = () => {
        setStudentId('new')
    }

    const onDelete = (id: GridRowId) => {
        console.log(`delete student: ${id}`)
    }

    const onCancel = () => {
        setStudentId(null)
    }

    const onSettled = () => {
        setStudentId(null)
        queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/persons"))
    }

    const onError = () => {

    }

    return (
        <Grid container spacing={1}>
            <Grid size={3}>
                <ClassAutocomplete onChange={(_, value) => setGroup(value ?? undefined)} />
            </Grid>
            <Grid size={12}>
                <StudentTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} filters={{ group: group?.id }} />
                <StudentDialog studentId={studentId} open={!!studentId} onCancel={onCancel} onSettled={onSettled} onError={onError} />
            </Grid>
        </Grid>)
}

export { StudentListPage as Component }

