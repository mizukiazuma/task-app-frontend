import { Suspense, use, useMemo, useState } from "react";
import type { Task } from "./types/auth";
import { fetchTasks, type TasksParams } from "./api/tasks";
import { useSearchParams } from "react-router-dom";

function TaskList({data}: {data:Promise<Task[]>}){
        const tasks = use(data)
        return <div>
            {tasks.length == 0 && <p>タスクが一つもないです。</p>}
            {tasks.map((task: Task) => (
            <div>
                <h3>{ task.title }</h3>
                <h5>{ task.description }</h5>
                <p>{ task.status }</p>
                <p>{ task.due_date }</p>
            </div>
            ))}
        </div>
    }


export function Tasks(){
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q");
    const status = searchParams.get("status")
    const params = {
        'status': status,
        'q': q
    }
    const initialformData ={
            status:status,
            q:q,
        } 
    const [formData, setFormData] = useState(initialformData)
    function handleForm(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    function handlesubmit(tasks:TasksParams){
        const params: Record<string, string>= {}
        if (tasks.status) params['status'] = tasks.status
        if (tasks.q) params['q'] = tasks.q
        setSearchParams(params)
    };
    const data = useMemo(() => fetchTasks(params),[status, q])
    return(
        <div>
            <div>
                Status：<input
                        type="text"
                        value={formData.status?? ""}
                        onChange={handleForm}
                        name="status"
                        placeholder="status"
                    />
                </div>
                <div>
                    Q
                    <input
                    type="text"
                    value={formData.q?? ""}
                    onChange={handleForm}
                    name="q"
                    placeholder="q"/>
                </div>
                <button type = "submit" onClick={() => handlesubmit(formData)} >検索</button>
            <Suspense key={q + status} fallback = {<p>ローディング中</p>}>
                <TaskList data = {data}/>
            </Suspense>
        </div>
    )
}