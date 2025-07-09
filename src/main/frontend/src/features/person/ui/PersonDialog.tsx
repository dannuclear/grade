import { rqClient } from '@shared/api/instance'
import { DefaultDialog, DefaultDialogProps } from '@shared/ui'
import { PersonForm, PersonFormProps } from './PersonForm'

export const PersonDialog = ({ personId, onSuccess, onError, ...props }: Omit<DefaultDialogProps, 'title' | 'dialogContent'> & Omit<PersonFormProps, 'values'> & { personId: number | null }) => {
    const { data } = rqClient.useQuery('get', "/api/v1/persons/{id}", {
        params: {
            path: { id: personId as number }
        }
    }, { enabled: !!personId })

    rqClient.useMutation('put', '/api/v1/users/{id}')
    return (
        <DefaultDialog
            {...props}
            maxWidth="lg"
            fullWidth
            title='Сведения об учащемся'
            dialogContent={<PersonForm onSuccess={onSuccess} onError={onError} values={data} />} />
    )
}
