import { ReactNode } from "react"
import { AlertDialogFooter, AlertDialogHeader, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface confirmModalProps {
    children: ReactNode
    onConfirm: () => void
}
const ConfirmModal = ({ children, onConfirm }: confirmModalProps) => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={onConfirm}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ConfirmModal