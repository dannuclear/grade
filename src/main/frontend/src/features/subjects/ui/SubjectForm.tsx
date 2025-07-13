import { Grid } from "@mui/material"
import { FieldValues, FormContainer, FormContainerProps, SubmitHandler, TextFieldElement } from "react-hook-form-mui"

export type SubjectFormProps = FormContainerProps & {
    formId?: string,
}

export const SubjectForm = ({ formId, onSuccess, ...props }: SubjectFormProps) => {

    const onInnerSuccess: SubmitHandler<FieldValues> = (data) => {
        if (onSuccess) onSuccess(data)
    }

    return (
        <FormContainer
            {...props}
            onSuccess={onInnerSuccess}
            FormProps={{ id: formId }}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <TextFieldElement name="name" label="Название" required />
                </Grid>
            </Grid>
        </FormContainer>
    )
}