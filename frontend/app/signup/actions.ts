import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { signupInfoSchema } from "@/utils/formValidation";

// const user = useSelector((state:any) => state.user.user);
// const dispatch = useDispatch()
export const  getValue = async (formData: FormData): Promise<void> => {
  const data = {
    name : formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    photo: formData.get("photo"),
    role: formData.get("role")
  }

  try {
    const validatedData = signupInfoSchema.parse(data);

    const response = await fetch(`http://localhost:5000/user/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
    // dispatch(setUser(data))
    // console.log(user)

    console.log(response)
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