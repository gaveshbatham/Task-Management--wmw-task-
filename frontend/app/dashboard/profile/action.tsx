"use server"; // Marks this function as a server action

import { setUser } from "@/redux/userSlice";
import { editInfoSchema } from "@/utils/formValidation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const editUser = async (prevState: any, formData: FormData) => {

  const data = Object.fromEntries(formData.entries());

  const dispatch = useDispatch()
  const user = useSelector((state:any) => state.user)

  try {
    // Validate input using Zod schema
    const validatedData = editInfoSchema.parse(data);
    console.log("Validated Data:", validatedData);
    
    // Make API request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ROUTE}/task/update/${user.email}`, validatedData, {
      withCredentials: true,
    });

    if (response.data.success) {
      dispatch(setUser(response.data))  // cross-check it
      toast("Edit successful!");
    } else {
      toast(response.data.message || "Edit failed")
      return { success: null, error: response.data.message || "Edit failed" };  //fix this
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
