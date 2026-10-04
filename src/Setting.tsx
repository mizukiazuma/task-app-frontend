import { useEffect, useState } from "react"
import { clearLocalStorage, getCurrentUserId } from "./utils/authStorage";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser,updateUser,type UserUpdateParams } from "./api/users";
import type { User } from "./types/auth";


export function Settings(){
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    let initialformData ={
            username:'',
            email:'',
        } 
    const [formData, setFormData] = useState(initialformData);
    useEffect(() => {
        const id = getCurrentUserId();
        if(!id){
            navigate("/login")
        }
        else{
           fetchUser(id).then(setUser,setFormData);
        }
    }, []);
    if(user==undefined){
        return(
            <div>
                ローディング中...
            </div>
        )
    }
    initialformData ={
            username:user.username,
            email:user.email,
        } 
    function handleForm(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    };
    async function handlesubmit(id:number,params:UserUpdateParams){
        await updateUser(id,params);
        alert("変更されました！！！")
    };
    function logout(){
        clearLocalStorage()
        navigate("/login")
    }
    return(
        <div>   
            <Link to={'/tasks'}>タスク一覧</Link>
                <div>
                    ユーザー名：<input
                            type="text"
                            value={formData.username}
                            onChange={handleForm}
                            name="username"
                            placeholder="username"
                        />
                </div>
                <div>
                    メールアドレス：<input
                            type="text"
                            value={formData.email}
                            onChange={handleForm}
                            name="email"
                            placeholder="email"
                        />
                </div>
                <button type = "submit" onClick={() => handlesubmit(user.id,formData)} >更新</button>
                <button onClick={() => logout()}>ログアウト</button>          
        </div>
    )
}