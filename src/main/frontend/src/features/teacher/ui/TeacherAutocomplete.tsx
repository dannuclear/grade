import { BaseTextFieldProps, TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";

const getFullName = (option: ApiComponents["schemas"]["TeacherDto"]): string => {
    return `${option.surname ?? ""} ${option.firstname ?? ""} ${option.patronymic ?? ""}`.trim()
}

export type TeacherAutocompleteProps = Omit<AutocompleteProps<ApiComponents["schemas"]["TeacherDto"], false, false, false, "div">, "renderInput" | "options"> & { label?: BaseTextFieldProps["label"], placeholder?: BaseTextFieldProps["placeholder"] }

export const TeacherAutocomplete = ({ label, placeholder, ...props }: TeacherAutocompleteProps) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/teachers", { params: { query: { size: 1000 } } })
    return (
        <Autocomplete
            {...props}
            loading={isPending}
            options={data?.content ?? []}
            renderInput={(params) =>
                <TextField
                    {...params}
                    placeholder={placeholder}
                    label={label} />
            }
            getOptionLabel={option => getFullName(option)}
            renderOption={(props, option) =>
                <li {...props} key={option.id}>{getFullName(option)}</li>
            }
        ></Autocomplete>
    )
}