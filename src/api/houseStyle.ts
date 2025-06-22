import axios from "axios";
import { API_URL } from "./axiosConfig";
import HouseStyle from "@/models/houseStyle";

export const getHouseStyle = async (): Promise<HouseStyle> => {
    const resp = await axios.get(`${API_URL}/HouseStyle`)

    console.log(resp)

    if(resp.status == 401){
        throw Error(resp.data)
    }

    return resp.data[0]
}