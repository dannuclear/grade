import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { StudentForm, StudentFormProps } from './StudentForm'

export type StudentDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<StudentFormProps, 'values' | 'onSuccess'> & { studentId: number | "new" | null, onSettled: () => void }

export const StudentDialog = ({ studentId, onSettled, onError, ...props }: StudentDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/persons/{id}", {
        params: {
            path: { id: studentId as number }
        }
    }, { enabled: Number.isInteger(studentId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/persons/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/persons', { onSettled })

    const onSuccess: StudentFormProps["onSuccess"] = (data) => {
        if (studentId == 'new')
            create({ body: data })
        else
            update({
                params: { path: { id: data.id as number } },
                body: data
            })
    }

    return (
        <DefaultDialog
            {...props}
            formId='student-form'
            maxWidth="lg"
            fullWidth
            title='Сведения об учащемся'
            isPending={isUpdating || isCreating || !studentId}
            onSave={() => { }}
            dialogContent={<StudentForm formId='student-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
