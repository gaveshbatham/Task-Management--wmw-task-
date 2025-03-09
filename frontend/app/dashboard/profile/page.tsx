import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useActionState } from 'react'
import { useSelector } from 'react-redux'
import { editUser } from './action'

const Profile = () => {
  const user = useSelector((state:any) => state.user)
  const [state, formAction] = useActionState(editUser,{error:null,success:null})

  return (
    <div className='bg-gray flex flex-col items-center mt-7 w-full h-full'>
    {/* Profile Section */}
      <div className="flex items-center p-6 bg-white shadow rounded-t-md w-full max-w-xl">
        {/* Profile Circle */}
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-white text-3xl font-medium">PH</span>
          </div>
        </div>
    
        {/* Profile Info */}
        <div className="ml-6 flex-1">
          <h2 className="text-2xl font-medium text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
    
        {/* Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-black transition">
            Go to home
          </button>
        </div>
      </div>
    
      {/* Form Section */}
      <div className=' w-full max-w-xl bg-white shadow rounded-b-md p-8'>
        <form className="space-y-4 flex flex-col items-center" action={formAction}>
          <div className="w-[98%]">
            <Label>Name</Label>
            <Input placeholder="Your name here" name="name" />
          </div>
          <div className="w-[98%]">
            <Label>Email</Label>
            <Input type="email" placeholder="Example@gmail.com" name="email" />
          </div>
          <div className='flex gap-4'>
            <Button className='bg-blue-500'>Edit</Button>
            <Button className='bg-white text-black border hover:bg-gray-300'>Go back</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile