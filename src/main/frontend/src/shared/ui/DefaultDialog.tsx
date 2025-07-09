import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { ReactNode } from "react"

export interface DefaultDialogProps extends DialogProps {
    dialogContent: ReactNode,
    onCancel?: () => void,
    onOk?: () => void,
    onSave?: () => void,
}


const DefaultDialog = ({ title, dialogContent, onCancel, onOk, onSave, ...props }: DefaultDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
                {onOk && <Button onClick={onOk}>Ok</Button>}
                {onSave && <Button onClick={onSave}>Сохранить</Button>}
                {onCancel && <Button onClick={onCancel}>Отмена</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default DefaultDialog