import { TextField } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";

export const SubjectAutocomplete = ({ ...props }: Omit<AutocompleteProps<ApiComponents["schemas"]["Subject"], false, false, false, "div">, "renderInput" | "options">) => {
    const { data, isPending } = rqClient.useQuery("get", "/api/v1/subjects", { params: { query: { size: 1000 } } })
    return (
        <Autocomplete
            {...props}
            loading={isPending}
            options={data?.content ?? []}
            renderInput={(params) => <TextField {...params} placeholder="Предмет" label="Предмет" />}
            getOptionLabel={option => option.name ?? ""}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name ?? ""}</li>}
        ></Autocomplete>
    )
}