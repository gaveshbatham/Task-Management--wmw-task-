"use server"; // Marks this function as a server action

import { loginInfoSchema } from "@/utils/formValidation";
import axios from "axios";
import { cookies } from "next/headers"; // For setting cookies in a server action

export const loginUser = async (prevState: any, formData: FormData) => {
  // Convert FormData into a plain object
  const data = Object.fromEntries(formData.entries());

  try {
    // Validate input using Zod schema
    const validatedData = loginInfoSchema.parse(data);
    console.log("Validated Data:", validatedData);

    // Make API request
    const response = await axios.post("http://localhost:5000/login", validatedData, {
      withCredentials: true,
    });

    if (response.data.success) {
     

      return { success: "Login successful!", error: null };
    } else {
      return { success: null, error: response.data.message || "Login failed" };
    }
  } catch (error: any) {
    if (error.name === "ZodError") {
      return { success: null, error: error.issues.map((err: any) => err.message).join(", ") };
    }

    return { success: null, error: error.response?.data?.message || "Something went wrong" };
  }
};
