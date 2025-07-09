
import axios from 'axios'




export const createEmployee = async (data) => {
    try {
        const res = await axios.post('http://localhost:7000/api/employees',data)
        return res.data
    } catch (error) {
        console.log('create error :',error);
        
    }
}


export const getEmployee = async (params = {}) => {
    try {
        const res = await axios.get('http://localhost:7000/api/employees',{ params })
        return res.data
    } catch (error) {
        console.log('create error :',error);
    }
}

export const getSingleEmployee = async (id) => {
  try {
    const res = await axios.get(`http://localhost:7000/api/employees/${id}`);
    return res.data;
  } catch (error) {
    console.log("fetch single error:", error);
  }
};


export const updateEmployee = async (id,data) => {
    try {
        const res = await axios.put(`http://localhost:7000/api/employees/${id}`,data)
         return res.data
    } catch (error) {
        console.log('create error :',error);
    }
}


export const deleteEmployee = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:7000/api/employees/${id}`)
         return res.data
    } catch (error) {
        console.log('create error :',error);
    }
}
