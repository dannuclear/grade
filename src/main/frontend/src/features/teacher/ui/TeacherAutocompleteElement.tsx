import { Controller } from "react-hook-form";
import { TeacherAutocomplete, TeacherAutocompleteProps } from "./TeacherAutocomplete";

export const TeacherAutocompleteElement = ({ name, ...props }: TeacherAutocompleteProps & { name: string }) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange, value } }) =>
                <TeacherAutocomplete
                    {...props}
                    onChange={(_, val) => onChange(val)}
                    value={value ?? {}}
                />}
        />
    )
}