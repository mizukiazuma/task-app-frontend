import { use } from "react";
import type { Task } from "./types/auth";
import { TaskItem } from "./TaskItem";

interface Props{
    data:Promise<Task[]>;
    onButtonClick:() => void;
}

export function TaskList(props:Props){
        const{data,onButtonClick}=props
        const tasks = use(data)
        return <div>
            {tasks.length == 0 && <p>タスクが一つもないです。</p>}
            {tasks.map((task: Task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onButtonClick={onButtonClick}
                    />
            ))}
        </div>
    }