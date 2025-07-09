import { Grid } from "@mui/material"
import { FormContainer, FormContainerProps, TextFieldElement } from "react-hook-form-mui"

export type PersonFormProps = {
    values: any,
    onSuccess: FormContainerProps["onSuccess"],
    onError: FormContainerProps["onError"]
}

export const PersonForm = ({ values, onSuccess, onError }: PersonFormProps) => {
    return (
        <FormContainer
            FormProps={{ style: { paddingTop: 5 } }}
            onSuccess={onSuccess}
            onError={onError}
            values={values}>
            <Grid container spacing={1}>
                <Grid size={2}>
                    <TextFieldElement name="surname" label="Фамилия" />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="firstname" label="Имя" />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="patronymic" label="Отчество" />
                </Grid>
            </Grid>
        </FormContainer>
    )
}
