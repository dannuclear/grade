import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { SubjectForm, SubjectFormProps } from './SubjectForm'

export type SubjectDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<SubjectFormProps, 'values' | 'onSuccess'> & { subjectId: number | "new" | null, onSettled: () => void }

export const SubjectDialog = ({ subjectId, onSettled, onError, ...props }: SubjectDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/subjects/{id}", {
        params: {
            path: { id: subjectId as number }
        }
    }, { enabled: Number.isInteger(subjectId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/subjects/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/subjects', { onSettled })

    const onSuccess: SubjectFormProps["onSuccess"] = (data) => {
        if (subjectId == 'new')
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
            formId='subject-form'
            maxWidth="xs"
            fullWidth
            title='Сведения о предмете'
            isPending={isUpdating || isCreating || !subjectId}
            onSave={() => { }}
            dialogContent={<SubjectForm formId='subject-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
