import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import  Link  from "next/link"


const AddTask = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70%] w-[100%]">
        <div className="bg-[#fff] relative top-[-4.5rem] w-[100%] border p-3 flex justify-between">
          <div className="text-2xl cursor-default">Create your Task</div>
          <Link href="/dashboard"><Button className="bg-blue-600">Go to tasks</Button></Link>
        </div>
        <div className="w-[50%]">
         <Card>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input type="date" id="dueDate" name="dueDate" required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white">Add Task</Button>
              </form>
            </CardContent>
          </Card>
        </div>  
    </div>
  )
}

export default AddTask