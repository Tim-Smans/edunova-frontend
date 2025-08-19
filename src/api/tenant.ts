import Tenant from "@/models/tenant"
import axios from "axios"
import { API_URL } from "./axiosConfig"

export const getTenantByName = async (name: string): Promise<Tenant> => {
    const resp = await axios.get(`${API_URL}/Tenant/by-name/${name}`)

    if(resp.status == 401 || resp.status == 404){
        throw Error(resp.data)
    }
    
    return resp.data
}

export const getTenants = async (): Promise<Tenant[]> => {
    const resp = await axios.get(`${API_URL}/Tenant`)

        if(resp.status == 401 || resp.status == 404){
        throw Error(resp.data)
    }

    return resp.data
}