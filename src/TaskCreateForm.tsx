import { useState } from "react";
import { createTask, type TaskCreateParams } from "./api/tasks";

export function TaskCreateForm({ onButtonClick} ){
    const initialformData ={
            title:'',
            description:'',
            status:'',
            due_date:'',
        } 
    const [formData, setFormData] = useState(initialformData)
    function handleForm(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleStatusForm = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    async function handlesubmit(params:TaskCreateParams){
        await createTask(params);
        onButtonClick();
        setFormData(initialformData);
  };
    return(
        <div>
            <div>
                タイトル：<input
                        type="text"
                        value={formData.title}
                        onChange={handleForm}
                        name="title"
                        placeholder="title"
                    />
            </div>
            <div>
                説明：<input
                        type="text"
                        value={formData.description}
                        onChange={handleForm}
                        name="description"
                        placeholder="description"
                    />
            </div>
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
            <div>
                期日：<input
                        type="date"
                        value={formData.due_date}
                        onChange={handleForm}
                        name="due_date"
                        placeholder="due_date"
                    />
            </div>
            <button type = "submit" onClick={() => handlesubmit(formData)} >新規作成</button>
        </div>
    )
}