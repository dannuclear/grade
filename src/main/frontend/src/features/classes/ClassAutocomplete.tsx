import { TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";

export const ClassAutocomplete = ({ ...props }: Omit<AutocompleteProps<{ id?: number; name?: string; }, false, false, false, "div">, "renderInput" | "options">) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/groups")
    return (
        <Autocomplete
            {...props}
            loading={isPending}
            options={data?.content ?? []}
            renderInput={(params) => <TextField {...params} placeholder="Группа" label="Группа" />}
            getOptionLabel={option => option.name ?? ""}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name}</li>}
        ></Autocomplete>
    )
}