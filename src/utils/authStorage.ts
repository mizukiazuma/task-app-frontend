export function getCurrentUserId(){
    const token = localStorage.getItem("accessToken")
    if(!token){
        return null
    }
    try {
        const T = token.split('.')[1]
        const decoded =  atob(T)
        const data = JSON.parse(decoded)
        return data.user_id; 
    } catch(error) { console.error(error); return null; }
}

export function clearLocalStorage(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}