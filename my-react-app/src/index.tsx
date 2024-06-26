import { v4 as uuidv4 } from 'uuid';

type Task ={
  id: string
  title: string
  completed: boolean
  createdAd: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e=>{
  e.preventDefault()


  if(input?.value === "" || input?.value == null)return
  const newTask: Task = {
    id: uuidv4(),
    title: input.value, 
    completed: false,
    createdAd: new Date(),
  }
tasks.push(newTask)
saveTasks()

addListItem(newTask)
input.value = ""

})

function addListItem(task:Task){
  const item = document.createElement("li")
  const lable = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", ()=>{
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type="checkbox"
  checkbox.checked = task.completed
  lable.append(checkbox, task.title)
  item.append(lable)
  list?.append(item)

}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify("TASKS"))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem("TASKS")
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}