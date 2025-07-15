import { TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";

export const TeacherAutocomplete = ({ ...props }: Omit<AutocompleteProps<ApiComponents["schemas"]["TeacherDto"], false, false, false, "div">, "renderInput" | "options">) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/teachers", { params: { query: { size: 1000 } } })
    return (
        <Autocomplete
            {...props}
            loading={isPending}
            options={data?.content ?? []}
            renderInput={(params) => <TextField {...params} placeholder="Преподаватель" label="Преподаватель" />}
            getOptionLabel={option => `${option.surname} ${option.firstname} ${option.patronymic}`}
            renderOption={(props, option) => <li {...props} key={option.id}>{`${option.surname} ${option.firstname} ${option.patronymic}`}</li>}
        ></Autocomplete>
    )
}