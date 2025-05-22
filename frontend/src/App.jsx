import AddTask from './addTask'
import './App.css'
import ShowTask from './showTask'
import {useState} from 'react'

function App() {
 const [formValue, setFormValue] = useState({title: "",description: ""});
const [update,setUpdate] = useState(false);
const [addedTask, setAddedTask] = useState(null)

 console.log(formValue)

  return (
    <>
    <div className='todo-app-wrapper'>

        <AddTask 
        setFormValue={setFormValue} 
        formValue={formValue} 
        update={update} 
        setUpdate={setUpdate}/>

        <ShowTask 
        addedTask={addedTask}
        setAddedTask={setAddedTask} 
        update={update} 
        setUpdate={setUpdate} 
        formValue={formValue} 
        setFormValue={setFormValue}/>

    </div>
    </>
  )
}

export default App
