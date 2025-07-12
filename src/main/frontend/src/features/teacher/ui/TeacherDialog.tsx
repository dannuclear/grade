import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { TeacherForm, TeacherFormProps } from './TeacherForm'

export type TeacherDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<TeacherFormProps, 'values' | 'onSuccess'> & { teacherId: number | "new" | null, onSettled: () => void }

export const TeacherDialog = ({ teacherId, onSettled, onError, ...props }: TeacherDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/teachers/{id}", {
        params: {
            path: { id: teacherId as number }
        }
    }, { enabled: Number.isInteger(teacherId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/teachers/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/teachers', { onSettled })

    const onSuccess: TeacherFormProps["onSuccess"] = (data) => {
        if (teacherId == 'new')
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
            formId='teacher-form'
            maxWidth="lg"
            fullWidth
            title='Сведения об учащемся'
            isPending={isUpdating || isCreating || !teacherId}
            onSave={() => { }}
            dialogContent={<TeacherForm formId='teacher-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
