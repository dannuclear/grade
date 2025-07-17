import { BaseTextFieldProps, TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";

const getFullName = (option: ApiComponents["schemas"]["PersonDto"]): string => {
    return `${option.surname ?? ""} ${option.firstname ?? ""} ${option.patronymic ?? ""}`.trim()
}

export type StudentAutocompleteProps = Omit<AutocompleteProps<ApiComponents["schemas"]["PersonDto"], false, false, false, "div">, "renderInput" | "options"> & { label?: BaseTextFieldProps["label"], placeholder?: BaseTextFieldProps["placeholder"] }

export const StudentAutocomplete = ({
    label = "Учащийся",
    placeholder = "Учащийся",
    ...props }: StudentAutocompleteProps) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/persons", { params: { query: { size: 1000 } } })
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
            isOptionEqualToValue={(option, value) =>
                option?.id === value?.id
            }
        ></Autocomplete>
    )
}