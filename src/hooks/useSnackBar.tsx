import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'

export type Severity = 'success' | 'info' | 'warning' | 'error';

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

export default function useSnackBar() {

    const [isOpen, setIsOpen] = useState(false)
    const [messageContent, setMessageContent] = useState('')
    const [severity, setSeverity] = useState<Severity>('info')

    const defaultOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' }
    const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>(defaultOrigin)

    const handleClose = () => setIsOpen(false)

    const triggerSnackBar = (severity: Severity, content: string, origin: SnackbarOrigin = defaultOrigin) => {
        setSeverity(severity)
        setMessageContent(content)
        setAnchorOrigin(origin)
        setIsOpen(true)
    }

    const SnackBar = () => (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
        // action={action}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant='filled'
            >
                {messageContent}
            </Alert>
        </Snackbar>
    )

    return {
        SnackBar,
        triggerSnackBar,
    }
}
