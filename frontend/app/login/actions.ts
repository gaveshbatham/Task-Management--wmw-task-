import { loginInfoSchema } from "@/utils/formValidation";
import axios from "axios";
import { toast } from "sonner";

export const  loginUser = async (formData: FormData): Promise<void> => {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role")
    }
  
    try {
      const  validatedData = loginInfoSchema.parse(data);
  
      const response = await axios.post('http://localhost:5000/login',validatedData,{
        withCredentials: true
      })
      // if(!response.data.success){}
      // console.log(response.data)
      return
    } catch (error: any) {
      const zodError = { ...error };
      console.log("validation errors: ", zodError.issues);
      const pull = (zodError.issues.map((err:any) => err.message));
      pull.map((err:string) => toast(err))
      return
    }  
  }