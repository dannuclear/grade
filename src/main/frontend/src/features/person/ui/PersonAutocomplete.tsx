import { TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";

export const PersonAutocomplete = ({ ...props }: Omit<AutocompleteProps<ApiComponents["schemas"]["PersonDto"], false, false, false, "div">, "renderInput" | "options">) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/persons", { params: { query: { size: 1000 } } })
    return (
        <Autocomplete
            {...props}
            loading={isPending}
            options={data?.content ?? []}
            renderInput={(params) => <TextField {...params} placeholder="Учащийся" label="Учащийся" />}
            getOptionLabel={option => `${option.surname} ${option.firstname} ${option.patronymic}`}
            renderOption={(props, option) => <li {...props} key={option.id}>{`${option.surname} ${option.firstname} ${option.patronymic}`}</li>}
        ></Autocomplete>
    )
}