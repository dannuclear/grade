import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { UserForm, UserFormProps } from './UserForm'

export type UserDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<UserFormProps, 'values' | 'onSuccess'> & { userId: number | "new" | null, onSettled: () => void }

export const UserDialog = ({ userId, onSettled, onError, ...props }: UserDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/users/{id}", {
        params: {
            path: { id: userId as number }
        }
    }, { enabled: Number.isInteger(userId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/users/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/users', { onSettled })

    const onSuccess: UserFormProps["onSuccess"] = (data) => {
        if (userId == 'new')
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
            formId='user-form'
            maxWidth="lg"
            fullWidth
            title='Сведения о пользователе'
            isPending={isUpdating || isCreating || !userId}
            onSave={() => { }}
            dialogContent={<UserForm formId='user-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
