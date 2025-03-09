import { addTask } from "@/redux/taskSlice"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

export const getTasks = async () => {
    const user = useSelector((state:any) => state.user)
    const dispatch = useDispatch()
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ROUTE}/task/one/${user.email}`)
    dispatch(addTask(response.data))
}