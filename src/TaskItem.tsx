import { useState } from "react"
import { updateTask, type TaskUpdateParams } from "./api/tasks"
import type { Task } from "./types/auth";
import { Modal } from "./Modal";

interface ItemProps{
    task:Task;
    onButtonClick:() => void;
}

export function TaskItem(  props:ItemProps){
    const{task,onButtonClick} = props
    const initialformData ={
            status:'',
        } 
    const [formData, setFormData] = useState(initialformData)
    const handleStatusForm = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    async function handlesubmit(id:number,params:TaskUpdateParams){
        await updateTask(id,params);
        onButtonClick();
        setFormData(initialformData);
    };
    const [showModal, setShowModal] = useState(false);
    return(
            <div>
                <h3>{ task.title }</h3>
                <h5>{ task.description }</h5>
                <p>{ task.status }</p>
                <p>{ task.due_date }</p>
                <div>
                ステータス：
                    <select 
                    value={formData.status}
                    onChange={handleStatusForm}
                    name="status"
                    >
                        <option value="" selected hidden>
                            選択してください
                        </option>
                        <option>
                            todo
                        </option>
                        <option>
                            doing
                        </option>
                        <option>
                            done
                        </option>
                    </select>
                </div>
                <button type = "submit" onClick={() => handlesubmit(task.id,formData)} >更新</button>
                <button onClick={() => setShowModal(true)}>削除</button>
                <Modal 
                id={task.id}
                showFlag={showModal}
                setShowModal={setShowModal}
                onButtonClick={onButtonClick}
                 />
            </div>
    )
}