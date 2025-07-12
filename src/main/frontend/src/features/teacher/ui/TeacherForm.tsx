import { capitalize, Grid, InputBaseProps } from "@mui/material"
import dayjs from "dayjs"
import { FieldValues, FormContainer, FormContainerProps, SubmitHandler, TextFieldElement } from "react-hook-form-mui"
import { DatePickerElement } from "react-hook-form-mui/date-pickers"

export type TeacherFormProps = FormContainerProps & {
    formId?: string,
}

export const TeacherForm = ({ formId, onSuccess, ...props }: TeacherFormProps) => {

    const onInnerSucces: SubmitHandler<FieldValues> = (data) => {
        if (dayjs.isDayjs(data.birthday))
            data.birthday = data.birthday.format('YYYY-MM-DD')
        if (onSuccess) onSuccess(data)
    }

    const innerCapitalize: InputBaseProps["onChange"] = (event) => {
        event.target.value = capitalize(event.target.value)
    }

    return (
        <FormContainer
            {...props}
            onSuccess={onInnerSucces}
            FormProps={{ id: formId }}>
            <Grid container spacing={1}>
                <Grid size={2}>
                    <TextFieldElement name="surname" label="Фамилия" required slotProps={{ htmlInput: { onChange: innerCapitalize } }} />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="firstname" label="Имя" required slotProps={{ htmlInput: { onChange: innerCapitalize } }} />
                </Grid>
                <Grid size={2}>
                    <TextFieldElement name="patronymic" label="Отчество" />
                </Grid>
                <Grid size={2}>
                    <DatePickerElement name="birthday" label="Дата" />
                </Grid>
            </Grid>
        </FormContainer>
    )
}
