import {z} from "zod"

const signupInfoSchema=z.object({
    name:z.string().nonempty({message:'name is required'}).regex(/^[A-Za-z ]+$/,{message:"Full name can contain only uppercase,lowercase characters and spaces"}),
    email:z.string().nonempty({message:"email is required!"}).email({message:"Invalid email!"}),
    password:z.string().nonempty({message:'password is required'}).min(6,{message:"password must be atleast 6 characters long"}),
    role:z.enum(['Admin','Member'],{message:'select valid option'})
})

const loginInfoSchema=z.object({
    name:z.string().nonempty({message:'full name is required'}).regex(/^[A-Za-z ]+$/,{message:"Full name can contain only uppercase,lowercase characters and spaces"}),
    email:z.string().nonempty({message:"email is required!"}).email({message:"Invalid email!"}),
    password:z.string().nonempty({message:'password is required'}).min(6,{message:"password must be atleast 6 characters long"}),
    role:z.enum(['Admin','Member'],{message:'select valid option'})
})

export {signupInfoSchema, loginInfoSchema}