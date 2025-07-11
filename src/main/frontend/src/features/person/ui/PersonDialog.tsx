import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { PersonForm, PersonFormProps } from './PersonForm'

export type PersonDialog = Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<PersonFormProps, 'values' | 'onSuccess'> & { personId: number | "new" | null, onSettled: () => void }

export const PersonDialog = ({ personId, onSettled, onError, ...props }: PersonDialog) => {
    const { data } = rqClient.useQuery('get', "/api/v1/persons/{id}", {
        params: {
            path: { id: personId as number }
        }
    }, { enabled: Number.isInteger(personId) })

    const { mutate: update, isPending: isUpdating } = rqClient.useMutation('put', '/api/v1/persons/{id}', { onSettled })
    const { mutate: create, isPending: isCreating } = rqClient.useMutation('post', '/api/v1/persons', { onSettled })

    const onSuccess: PersonFormProps["onSuccess"] = (data) => {
        if (personId == 'new')
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
            formId='person-form'
            maxWidth="lg"
            fullWidth
            title='Сведения об учащемся'
            isPending={isUpdating || isCreating || !personId}
            onSave={() => { }}
            dialogContent={<PersonForm formId='person-form' onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
