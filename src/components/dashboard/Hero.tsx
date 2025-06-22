import { getHouseStyle } from "@/api/houseStyle";
import HouseStyle from "@/models/houseStyle";
import { FC, useEffect, useState } from "react";

const Hero: FC = () => {
    const [houseStyle, setHouseStyle] = useState<HouseStyle | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchHouseStyle = async () => {
            try {
                const houseStyle = await getHouseStyle()
                console.log('test', houseStyle)
                if(houseStyle == undefined){
                    return
                }
                console.log(houseStyle?.primaryColor)

                setHouseStyle(houseStyle);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseStyle();
        return () => {
            controller.abort();
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <h1 style={{color: houseStyle?.primaryColor}}>Welkom op het dashboard!</h1>
    )
}

export default Hero