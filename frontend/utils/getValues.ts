import { toast } from "sonner";
import { signupInfoSchema } from "./formValidation";
export const  getValue = async (formData: FormData): Promise<void> => {
  const data = {
    name : formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    photo: formData.get("photo"),
    role: formData.get("toggle-a")
  }

  try {
    const validatedData = signupInfoSchema.parse(data);
   
    return
  } catch (error: any) {
    const zodError = { ...error };
    console.log("validation errors: ", zodError.issues);
    const pull = (zodError.issues.map((err:any) => err.message));
    pull.map((err:string) => toast(err))
    return
  }  
}