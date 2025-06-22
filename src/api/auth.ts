import axios from 'axios';
import type { LoginDTO } from '@/models/dto/loginDTO';
import { API_URL } from './axiosConfig';

export const login = async (data: LoginDTO) => {
    const resp = await axios.post(`${API_URL}/Auth/login`, data)

    if(resp.status == 401){
        throw Error(resp.data)
    }

    return resp.data
}