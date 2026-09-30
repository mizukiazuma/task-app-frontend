import { useState } from "react"
import { signup } from "./api/auth"
import type { SignupParams } from "./api/auth"
import { useNavigate } from "react-router-dom";

export function Signup(){
    const initialformData ={
            username:'',
            email:'',
            password:'',
        } 
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialformData)
    function handleForm(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    async function handlesubmit(params:SignupParams){
        try {
        await signup(params);
        alert('アカウントが作成されました');
        navigate("/login");
    } catch {
        setError('アカウントを作成できませんでした...');
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
                メアド：<input
                        type="text"
                        value={formData.email}
                        onChange={handleForm}
                        name="email"
                        placeholder="email"
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