import { useEffect, useState } from "react";
import ProfileContainer from "../profileContainer/ProfileContainer";

export default function InitUserInfoComponent(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    

    async function fetchData() {
        const response = await fetch("https://reqres.in/api/users?delay=3");
        const json = await response.json();
        setData(json.data);
    }

    return (
        <div>
                {
                    data.map(user => (<ProfileContainer user={user}/>))
                }
        </div>
    )
}