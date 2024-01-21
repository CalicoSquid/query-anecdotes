import axios from "axios"
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
    const res = await axios.get(baseUrl);
    console.log(res.data)
    return res.data;
}

export const create = async (data) => {
    const res = await axios.post(baseUrl, data);
    return res.data;
}

export const update = async (data) => {
    const res = await axios.put(`${baseUrl}/${data.id}`, data);
    return res.data;
}

