import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          (<Toast key={id} {...props} className="bg-white">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-black">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-green-700 font-bold">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-black hover:text-black"/>
          </Toast>)
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
