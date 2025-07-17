import { Controller } from "react-hook-form";
import { StudentAutocomplete, StudentAutocompleteProps } from "./StudentAutocomplete";

export const StudentAutocompleteElement = ({ name, ...props }: StudentAutocompleteProps & { name: string }) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange, value } }) =>
                <StudentAutocomplete
                    {...props}
                    onChange={(_, val) => onChange(val)}
                    value={value ?? {}}
                />}
        />
    )
}