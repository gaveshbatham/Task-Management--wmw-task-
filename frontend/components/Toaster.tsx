import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {

  return (
    <Sonner
      className="toaster group"
      closeButton
      theme="system"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    ></Sonner>
  );
};

export { Toaster };
