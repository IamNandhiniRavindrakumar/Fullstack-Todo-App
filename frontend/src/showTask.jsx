import './showTask.css';
import TasksComp from './tasksComp';
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiFeatherFill } from "react-icons/pi";


export default function ShowTask(data) {
    return (
      <div className="left-main-div">
        <h1>Recent Tasks</h1>
        <div className='left-content-box'>
          <TasksComp addedTask={data.addedTask}
           setAddedTask={data.setAddedTask}
           update={data.update} 
           setUpdate={data.setUpdate}
           formValue={data.formValue}
           setFormValue={data.setFormValue}
             />
        </div>
      </div>
    );
  }
  

