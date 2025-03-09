"use server"
import { loginInfoSchema } from "@/utils/formValidation";
import axios from "axios";
import { cookies } from "next/headers"; // For setting cookies in a server action
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const loginUser = async (prevState: any, formData: FormData) => {
  // Convert FormData into a plain object
  const data = Object.fromEntries(formData.entries());

  try {
    // Validate input using Zod schema
    const validatedData = loginInfoSchema.parse(data);
    console.log(" Validated Data:", validatedData);

    // Make API request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ROUTE}/login`, validatedData, {
      withCredentials: true,
    });

    if (response.data.success) {
      // Set HttpOnly cookie using `cookies()`
      const cookieStore = await cookies();
      cookieStore.set("Authorization", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // toast("Login successful!")
      return response.data
    } else {
      // toresponse.data.message || "Login failed")
      return { success: null, error: response.data.message || "Login failed" };
    }
  } catch (error: any){
    if (error.name === "ZodError") {
      const pull = error.issues.map((err: any) => err.message)
      // pull.map((err:string) => toast(err))
    }

    const miss = error.response?.data?.message || "Something went wrong";
  }
};
