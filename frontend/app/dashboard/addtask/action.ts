"use server"; // Marks this function as a server action

import { taskSchema } from "@/utils/formValidation";
import axios from "axios";
import { toast } from "sonner";

export const getTask = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  try {
    const validatedData = taskSchema.parse(data);
    console.log("Validated Data:", validatedData);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_ROUTE}/task/add`, validatedData, {
      withCredentials: true,
    });

    if (response.data.success) {
      return toast("Task added successfully!");
    } else {
      return { success: null, error: response.data.message || "Try again" };  //fix this
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
