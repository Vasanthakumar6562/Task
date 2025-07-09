import axios from 'axios'




export const register = async (data) =>{
    try {
        const res = await axios.post('http://localhost:7000/api/auth/register',data)
        return  res.data;
    } catch (error) {
        console.log(error);  
    }
}


export const login = async (data) => {
    try {
        const res = await axios.post('http://localhost:7000/api/auth/login',data)
        return res.data;
    } catch (error) {
        console.log(error);  
    }
}