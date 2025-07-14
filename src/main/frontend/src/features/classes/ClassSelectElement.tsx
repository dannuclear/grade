import { rqClient } from '@shared/api/instance'
import { memo } from 'react'
import { SelectElement, SelectElementProps } from 'react-hook-form-mui'

const ClassSelectElement = ({ ...props }: SelectElementProps) => {
    const { data } = rqClient.useQuery("get", "/api/v1/groups")

    return (
        <SelectElement {...props} options={data?.content?.map(el => ({ id: el.id, label: el.name }))} />
    )
}

const MClassSelectElement = memo(ClassSelectElement)

export { ClassSelectElement, MClassSelectElement }

