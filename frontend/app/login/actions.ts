import { loginInfoSchema } from "@/utils/formValidation";
import { toast } from "sonner";
import axios from "axios";

export const loginUser = async (formData: FormData): Promise<void> => {


  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries());

  console.log("Processed FormData -->", data); // Now it will log correctly

  try {
    // Validate input using Zod schema
    const validatedData = data;
    // const validatedData = loginInfoSchema.parse(data);

    // Make API request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, validatedData, {
      withCredentials: true, 
    });

    toast.success("Login successful!");
    console.log("API Response:", response.data);

    return response.data;
  } catch (error: any) {
    if (error.name === "ZodError") {
      console.log("Validation errors:", error.issues);
      error.issues.forEach((err: any) => toast.error(err.message));
      return;
    }

    console.error("Login error:", error.response?.data?.message || "Something went wrong");
    toast.error(error.response?.data?.message || "Login failed");
  }
};

