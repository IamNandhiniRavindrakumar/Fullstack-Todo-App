import './showTask.css'
// import { BsBookmarkStarFill } from "react-icons/bs";
// <BsBookmarkStarFill className='tag' /> 
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiFeatherFill } from "react-icons/pi";
import {useEffect,useState} from 'react';

export default function TasksComp(updateTasks){
  console.log(updateTasks)
 const {addedTask, setAddedTask, update, setUpdate,formValue,setFormValue} = updateTasks;

 const clickEdit = (data)=>{
  setFormValue(data)
 }

  //WHY USE USEEFFECT ONLY FOR GET METHOD?
  //We use useEffect for the GET request because we want to load data when the component mounts.
  //We don't use useEffect for POST because:
  //The POST happens only when the user submits the form — not automatically when the component loads.

    useEffect(()=>{
      console.log("get ran")
        fetch('https://todo-backend-i7pa.onrender.com/todo',
          {
            method : 'GET',
            headers : {'content-type' : 'application/json'}
          }
        ).then(res =>{
          if(res.ok){
            return res.json()
          }
        }).then(data=>{
          console.log("data",data)
          setAddedTask(data)
         
        }).catch(error=>{
          console.log(error)
        })
      },[update])
 
      console.log(addedTask);
   
const deleteHandler = (id) => {
  
  fetch(`https://todo-backend-i7pa.onrender.com/todo/${id}`, {
    method: 'DELETE',
    headers: {'content-type':'application/json'},
  }).then(res => {
    alert("deleted successfully")
    setUpdate(!update)
    // handle error
  }).catch(error => {
   console.log(error)
  })
}


        return(
            <>
                {addedTask? addedTask.map((item)=>{

const createdAt = new Date(item.createdAt);

const date = `${createdAt.getDate().toString().padStart(2,"0")}/ 
              ${(createdAt.getMonth()+1).toString().padStart(2,"0")}/
              ${createdAt.getFullYear()}`

const time = `${createdAt.getHours().toString().padStart(2,"0")}:
              ${createdAt.getMinutes().toString().padStart(2,"0")}`


                    return(
                            <div key={item._id} className="Tasks-box">
                                <div className='tasks-top-line'>
                                    <div>
                                    <h1 className='title'>{item.title} </h1>  
                                    <MdModeEditOutline onClick={()=>clickEdit(item)} className='edit-icon'/> 
                                    <RiDeleteBin6Line onClick={()=>deleteHandler(item._id)} className='dlt-icon'/>
                                    </div>
                                                    
                                    <h4>Date: {date}    Time: {time}</h4>
                                </div>
                                <div className='tasks-bottom-line'>
                                    <p>
                                    <PiFeatherFill />    {item.description}
                                    </p>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                        )
                
            }) : "no tasks were added:(" }
            </>
        )

}