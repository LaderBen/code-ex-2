import { useEffect, useState } from "react";
import './style.css'
import LoadingComponent from "../loadingComponent/LoadingComponent";

export default function InitUserInfoComponent(props) {
    const [searchName, setSearchName] = useState("");
    const [data, setData] = useState([]);
    const [filtedData, setFiltedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [late, setLate] = useState(2);
    const [isLate, setIsLate] = useState(false);
    let [date, setDate] = useState([]);


    useEffect(() => {
        fetchData();
    }, [data])

    useEffect(() => {
        handleClickSearch();
    }, [data])

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
                handleClickSearch();
            })
            .catch(error => {
                clearTimeout(timeout);
                setLoading(true);
                console.error("Time Out!" + error);
            })
    }




    function handleLate() {
        setIsLate(!isLate);
        if (isLate) {
            alert("respone will be late");
            setLate(5);
            setLoading(true);
            setData([]);
            fetchData();
        } else {
            alert("respone will be normal");
            setLate(2);
            setLoading(true);
            setData([]);
            fetchData();

        }
    }

    const handleChangeName = (event) => {
        setSearchName(event.target.value);
    };

    const handleClickSearch = () => {
        const buf = data.filter(user => { return user.first_name.toLowerCase().includes(searchName.toLowerCase()) || user.last_name.toLowerCase().includes(searchName.toLowerCase()) || user.email.toLowerCase().includes(searchName.toLowerCase()) || user.id === Number(searchName) });
        setFiltedData(buf);
        console.log(filtedData);

    };

    const loadingComponent = [];

    for (let i = 0; i < 6; i++) {
        loadingComponent.push(<LoadingComponent />);
    }




    return (
        <div>
            <h2>Filter</h2>
            input name email or user id:<input id="first_name" type="text" value={searchName} onChange={handleChangeName} /><button onClick={handleClickSearch}>search</button>
            <hr />
            {
                loading ? loadingComponent : filtedData.map(user => (
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