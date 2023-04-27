import { useEffect, useState } from "react";
import './style.css'
import LoadingComponent from "../loadingComponent/LoadingComponent";

export default function InitUserInfoComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [late, setLate] = useState(2);
    let [date, setDate] = useState([]);


    useEffect(() => {
        fetchData();
    })

    async function fetchData() {

        let controller = new AbortController();
        let timeout = setTimeout(() => {
            controller.abort();
        }, 3000);

        await fetch("https://reqres.in/api/users?delay=" + late, { signal: controller.signal })
            .then(response => response.json())
            .then(json => {
                clearTimeout(timeout);
                setData(json.data);
                setLoading(false);
                setDate(new Date());
                console.log(data);
            })
            .catch(error => {
                clearTimeout(timeout);
                setLoading(true);
                console.error("Time Out!" + error);
            })
    }
    


    function handleLate() {
        setLate(5);
        setLoading(true);
        setData([]);
        fetchData();
    }

    const loadingComponent = [];

    for (let i = 0; i < 6; i++) {
        loadingComponent.push(<LoadingComponent />);
    }



    return (
        <div>
            {
                loading ? loadingComponent : data.map(user => (
                    <div className="container">
                        <div className='photo'><img src={user.avatar} alt="" /></div>
                        <div className='info'>
                            <p>First Name: {user.first_name} </p>
                            <p>Last Name:   {user.last_name}</p>
                            <p>Email:   {user.email}</p>
                        </div>
                    </div>
                ))
            }
            <p>last update time: {date.toLocaleString()}</p>
            <button onClick={handleLate}>Simulate Late</button>
        </div>
    )
}