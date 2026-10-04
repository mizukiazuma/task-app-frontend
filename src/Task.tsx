import { Suspense, useMemo, useState } from "react";
import { fetchTasks, type TasksParams, } from "./api/tasks";
import { Link, useSearchParams } from "react-router-dom";
import { TaskCreateForm } from "./TaskCreateForm";
import { TaskList } from "./TaskList";

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
    const handleStatusForm = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    function handlesubmit(tasks:TasksParams){
        const params: Record<string, string>= {}
        if (tasks.status) params['status'] = tasks.status
        if (tasks.q) params['q'] = tasks.q
        setSearchParams(params)
    };
    const [count, setCount] = useState(0);
    function handleChildAction() {
        setCount((prev) => prev + 1);
    }
    const [updatecount, setupdateCount] = useState(0);
    function handleUpdateAction() {
        setupdateCount((prev) => prev + 1);
    }
    const data = useMemo(() => fetchTasks(params),[status, q, count, updatecount]);
    return(
        <div>
            <Link to={'/users'}>設定</Link>
            <div>
                Status：
                <select 
                    value={formData.status}
                    onChange={handleStatusForm}
                    name="status"
                    >
                        <option value="" selected>
                            すべて
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
                <TaskList 
                data = {data} 
                onButtonClick={ handleUpdateAction }
                />
            </Suspense>
            <TaskCreateForm onButtonClick={handleChildAction}/>
        </div>
    )
}