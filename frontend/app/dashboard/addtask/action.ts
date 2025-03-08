export const getTasks = (formData: FormData) => {
  const task = {
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate")
  }
}