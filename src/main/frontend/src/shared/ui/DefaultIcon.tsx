
export const DefaultIcon = ({ iconName, iconStyle = 'fa-duotone ' }: { iconName: string, iconStyle?: string }) => {
    return (
        <i className={`${iconStyle} ${iconName}`}></i>
    )
}
