import { Grid } from "@mui/material"
import { FormContainer, FormContainerProps, TextFieldElement } from "react-hook-form-mui"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export type PersonFormProps = {
    values: any,
    onSuccess: FormContainerProps["onSuccess"],
    onError: FormContainerProps["onError"]
}

export const PersonForm = ({ values, onSuccess, onError }: PersonFormProps) => {
    return (
        <FormContainer
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
                <Grid size={2}>
                    <DatePicker name="birthday" label="Дата"/>
                </Grid>

            </Grid>
        </FormContainer>
    )
}
