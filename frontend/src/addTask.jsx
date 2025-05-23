import './addTask.css';


export default function AddTask(inputData){
const {formValue,setFormValue,update,setUpdate} = inputData;

//why calling a separate function (handleSumbit)
// => Readability and Clean Code
// => Reusability
//If you want to call handleSubmit from somewhere else (like a keyboard shortcut or button click), you can just call the function.
// => Cleaner Separation of Concerns
//JSX handles layout and structure. and Functions handle logic and behavior.
//Keeping them separate follows the React pattern of “logic outside JSX”.

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValue)

    fetch('http://todo-backend-i7pa.onrender.com/todo', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(formValue)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(tasks => {
     alert("added successfully")
     setUpdate(!update)
     // Why doesn’t the empty string overwrite the form values?
     //The response is not tied directly to the form state (formValue). The response is used for actions like:
     //Displaying the newly created task.
     //Alerting the user that the task was added successfully.

     //The form fields (input and textarea) are linked to the STATE (formValue). 
     // When you call setFormValue({ title: "", description: "" }), React clears the fields, resetting them to empty.
     //and why are we clearing the values specifically HERE? because the input field's data has to be cleared, ONCE the FORM IS SUBMITTED. 
     //so we are setting the values empty AT THIS PLACE.
     setFormValue({
      title: "",
      description: ""
     })
  
    }).catch(error => {
     console.log(error)
    })
}


const updateHandler = () => {
  fetch(`http://todo-backend-i7pa.onrender.com/todo/${formValue._id}`, {
    method: 'PUT',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(formValue)
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(tasks => {
   alert("updated successfully")
   setUpdate(!update)
  }).catch(error => {
   console.log(error)
  })
}



    return(
        <>
        <div className="right-main-div">
            <h1 className='right-title'>To-Do List</h1>
            <form className="adding-task-box" onSubmit={(e)=> handleSubmit(e)}>
              {/* <textarea placeholder="Name a task..." name="newTask" type="text"></textarea> */}
              <h1 className='title'>Title</h1>
              <input onChange={(e)=>
                setFormValue({...formValue, title:e.target.value})} placeholder='give a Title'
                 name='title' 
                 type='text'
                 //value={formValue.title} means the value displayed in the input box is whatever is stored in state.
                 //value = "displaying area(displays whatever the state has, as the value, in the input field";
                 //state(setformvalue) = "is the actual value"(which is going to be shown in the  value - input field)
                 value={formValue.title}/>
              <h1 className='description'>Description</h1>
              <textarea onChange={(e)=>
                setFormValue({...formValue, description:e.target.value})}
                 placeholder="Add your Task!  Eg. walk the dog."
                 value={formValue.description}>
              </textarea>
              {formValue._id === undefined ? 
              <button className='add-task-btn'>Add to the list</button> :
              <button style={{background:"orange"}} className='add-task-btn' onClick={updateHandler}>Update</button>
              }
            </form>
           
        </div>
        </>
    )
   
}