import toast from 'react-hot-toast';
export function useNotification() {
    return {
        loading: (message: string = 'Patientez...' ) =>  toast.loading(message),
        success: (message: string = 'Opération effectuée avec succès.' ) =>  toast.success(message),
        error: (message: string = 'une erreur est survenue' ) =>  toast.success(message),
    }
}