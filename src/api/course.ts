import { Course } from "@/models/course"
import axios from "axios"
import { API_URL } from "./axiosConfig"

export const getCourses = async (): Promise<Course[]> => {
    const resp = await axios.get(`${API_URL}/Course`)
    const data: Course[] = resp.data
    if(resp.status == 401 || resp.status == 404){
        throw Error(resp.data)
    }
    
    data.map((x, i )=> {
        return x.tags = resp.data[i].courseTags
    })

    console.log(data)

    return data
}