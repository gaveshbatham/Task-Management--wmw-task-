import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"


const AddTask = () => {
  return (
    <div className="min-h-screen min-w-screen">
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
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" name="status" required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white">Add Task</Button>
              </form>
            </CardContent>
          </Card>
    </div>
  )
}

export default AddTask