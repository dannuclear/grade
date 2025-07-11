import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { ClassForm, ClassFormProps } from './ClassForm'

export type ClassDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<ClassFormProps, 'values' | 'onSuccess'> & { classId: number | "new" | null, onSettled: () => void }

export const ClassDialog = ({ classId, onSettled, onError, ...props }: ClassDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/groups/{id}", {
        params: {
            path: { id: classId as number }
        }
    }, { enabled: Number.isInteger(classId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/groups/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/groups', { onSettled })

    const onSuccess: ClassFormProps["onSuccess"] = (data) => {
        if (classId == 'new')
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
            formId='class-form'
            maxWidth="xs"
            fullWidth
            title='Группа/Класс'
            isPending={isUpdating || isCreating || !classId}
            onSave={() => { }}
            dialogContent={<ClassForm formId='class-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
