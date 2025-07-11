import { Grid } from "@mui/material"
import { FormContainer, FormContainerProps, TextFieldElement } from "react-hook-form-mui"

export type ClassFormProps = FormContainerProps & {
    formId?: string,
}

export const ClassForm = ({ formId, ...props }: ClassFormProps) => {
    return (
        <FormContainer
            {...props}
            FormProps={{ id: formId }}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <TextFieldElement name="name" label="Наименование" required />
                </Grid>
            </Grid>
        </FormContainer>
    )
}
