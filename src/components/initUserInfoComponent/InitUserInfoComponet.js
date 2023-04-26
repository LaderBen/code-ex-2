import { useEffect, useState } from "react";
import './style.css'

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
                data.map(user => (
                    <div className="container">
                        <div className='photo'><img src={loading ? "/public/logo192.png" : user.avatar} alt="" /></div>
                        <div className='info'>
                            <p>First Name: {loading ? "loading" : user.first_name} </p>
                            <p>Last Name:   {loading ? "loading" : user.last_name}</p>
                            <p>Email:   {loading ? "loading" : user.email}</p>
                        </div>
                    </div>


                ))
            }
        </div>
    )
}