import { useState } from "react"
import { login } from "./api/auth"
import type { LoginParams } from "./api/auth"
import { useNavigate } from "react-router-dom";

export function Login(){
    const initialformData ={
            username:'',
            password:'',
        } 
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialformData)
    function handleForm(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    async function handlesubmit(params:LoginParams){
        try {
        const data = await login(params);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('accessToken', data.access);
        alert('ログインできました');
        navigate("/tasks");
    } catch {
        setError('ログインできませんでした...');
    }
  };
    return(
        <div>
            <div>
                名前：<input
                        type="text"
                        value={formData.username}
                        onChange={handleForm}
                        name="username"
                        placeholder="username"
                    />
            </div>
            <div>
                パスワード：<input
                        type="password"
                        value={formData.password}
                        onChange={handleForm}
                        name="password"
                        placeholder="password"
                    />
            </div>
            {error && <p>{error}</p>}
            <button type = "submit" onClick={() => handlesubmit(formData)} >提出</button>
        </div>
    )
}