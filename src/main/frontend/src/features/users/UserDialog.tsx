import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { toast } from 'react-toastify'
import { UserForm, UserFormProps } from './UserForm'

export type UserDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<UserFormProps, 'values' | 'onSuccess'> & { userId: number | "new" | null, onSuccess: () => void }

export const UserDialog = ({ userId, onSuccess, onError, ...props }: UserDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/users/{id}", {
        params: {
            path: { id: userId as number }
        }
    }, { enabled: Number.isInteger(userId) })

    const onInnerError = (error: any) => {
        toast.error(error.message)
    }

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/users/{id}', { onSuccess, onError: onInnerError })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/users', { onSuccess, onError: onInnerError })

    const onInnerSuccess: UserFormProps["onSuccess"] = (data) => {
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
            dialogContent={<UserForm formId='user-form' onSuccess={onInnerSuccess} onError={onError} values={data} />} />
    )
}
