import { loginInfoSchema } from "@/utils/formValidation";
import { toast } from "sonner";

export const  loginUser = async (formData: FormData): Promise<void> => {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role")
    }
  
    try {
      const validatedData = loginInfoSchema.parse(data);
  
      const response = await fetch(`${process.env.NEXT_BACKEND_ROUTE}:${process.env.NEXT_BACKEND_PORT}/user/one/${data.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(validatedData),
      })
      
      return
    } catch (error: any) {
      const zodError = { ...error };
      console.log("validation errors: ", zodError.issues);
      const pull = (zodError.issues.map((err:any) => err.message));
      pull.map((err:string) => toast(err))
      return
    }  
  }