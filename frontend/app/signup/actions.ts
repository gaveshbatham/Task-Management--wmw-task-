import { signupInfoSchema } from "@/utils/formValidation";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const signupUser = async (prevState: any, formData: FormData) => {
  // Convert FormData into a plain object
  const data = Object.fromEntries(formData.entries());

  try {
    // Validate input using Zod schema
    const validatedData = signupInfoSchema.parse(data);
    console.log("Validated Data:", validatedData);

    // Make API request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ROUTE}/user/add`, validatedData);

    if (response.data.success) {
      toast("Signup successful!");
      redirect("/login")
    } else {
      return { success: null, error: response.data.message || "Signup failed" };  //fix this
    }
  } catch (error: any) {
    if (error.name === "ZodError") {
      const pull = error.issues.map((err: any) => err.message)
      pull.map((err:string) => toast(err))
    }

    const miss = error.response?.data?.message || "Something went wrong";
    toast(miss)
  }
};
