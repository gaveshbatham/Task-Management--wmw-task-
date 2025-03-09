import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { signupInfoSchema } from "@/utils/formValidation";
import axios from "axios"

// const user = useSelector((state:any) => state.user.user);
// const dispatch = useDispatch()
export const  getValue = async (formData: FormData): Promise<void> => {
  const data = {
    name : formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    profilePhoto: formData.get("photo"),
    role: formData.get("role")
  }

  try {
    const validatedData = signupInfoSchema.parse(data);

    const response = await axios.post(`http://localhost:5000/user/add`,validatedData)
    // dispatch(setUser(data))
    // console.log(user)

    console.log(validatedData, response.data)
    return
  } catch (error: any) {
    const zodError = { ...error };
    console.log("validation errors: ", zodError.issues);
    const pull = (zodError.issues.map((err:any) => err.message));
    pull.map((err:string) => toast(err))
    return
  }  
}

// export const handleLogout = () => {
//   localStorage.removeItem();
//   localStorage.removeItem();
//   window.location.href = "http://localhost:3000/";
//   toast("you have logged out")
// };