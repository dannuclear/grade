import { Grid } from "@mui/material"
import { CheckboxElement, FormContainer, FormContainerProps, TextFieldElement } from "react-hook-form-mui"

export type UserFormProps = FormContainerProps & {
    formId?: string,
}

export const UserForm = ({ formId, onSuccess, ...props }: UserFormProps) => {
    return (
        <FormContainer
            {...props}
            defaultValues={{
                isActive: true
            }}
            onSuccess={onSuccess}
            FormProps={{ id: formId }}>
            <Grid container spacing={1}>
                <Grid size={2}>
                    <TextFieldElement name="surname" label="Фамилия" required />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="firstname" label="Имя" required />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="patronymic" label="Отчество" />
                </Grid>
                <Grid size={6} />

                <Grid size={2}>
                    <TextFieldElement name="username" label="Имя пользователя" required />
                </Grid>

                <Grid size={2}>
                    <TextFieldElement name="password" label="Пароль" type="password" />
                </Grid>

                <Grid size={2}>
                    <CheckboxElement name="isActive" label="Активный" />
                </Grid>

                <Grid size={6} />

                <Grid size={2}>
                    <TextFieldElement name="tgUsername" label="Имя telegram" />
                </Grid>

                <Grid size={10}>
                    <TextFieldElement name="roles" label="Роли" />
                </Grid>
            </Grid>
        </FormContainer>
    )
}