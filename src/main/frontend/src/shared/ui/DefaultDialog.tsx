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
            <DialogTitle sx={{ paddingY: 1, backgroundColor: "lightsteelblue" }}>{title}</DialogTitle>
            <DialogContent dividers>{dialogContent}</DialogContent>
            <DialogActions sx={{ paddingY: 1, backgroundColor: "lightsteelblue" }}>
                {onOk && <Button color="error" onClick={onOk}>Ok</Button>}
                {onSave && <Button color="error" onClick={onSave}>Сохранить</Button>}
                {onCancel && <Button color="success" onClick={onCancel}>Отмена</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default DefaultDialog