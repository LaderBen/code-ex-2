import { useEffect, useState } from "react";
import ProfileContainer from "../profileContainer/ProfileContainer";

export default function InitUserInfoComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])
    

    async function fetchData() {
        setLoading(true);
        const response = await fetch("https://reqres.in/api/users?delay=3");
        const json = await response.json();
        setData(json.data);
        setLoading(false);
    }

    return (
        <div>
                {
                    loading? <h1>Loading</h1>:
                    data.map(user => (<ProfileContainer user={user}/>))
                }
        </div>
    )
}