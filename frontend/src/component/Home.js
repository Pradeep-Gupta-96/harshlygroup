import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import './Home.css'

const Home = () => {
    const [data, setdata] = useState([])
    const [Name, setName] = useState("")
    const [Prise, setPrise] = useState("")
    const [userid, setuserid] = useState(null)

    //To fetch the list of all cars
    const API = "http://localhost:5000/api/Cars"
    const fetchData = async (url) => {
        const response = await fetch(url);
        const data = await response.json()
        setdata(data)
        setName(data[0].Name)
        setPrise(data[0].Prise)
        setuserid(data[0].id)
    }
    console.log(data);
    useEffect(() => {
        fetchData(API)
    }, [])

    //=================put
    const selectUser = (id) => {
        console.log("mhbjyj", data[id - 1])
        let item = data[id - 1]
        setName(item.Name)
        setPrise(item.Prise)
        setuserid(item.id)

    }
    const OnUpdate = () => {
        let item = { Name, Prise }
        console.log("item", item)

        fetch(`http://localhost:5000/api/Cars/${userid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then(res => res.json()).then(data => {
            if (data.error) {
                alert(data.error)
            }
            console.log(data)
        })

    }
    return (
        <>
            <Navbar />
            <div className="main">
                <div id="sideBar">
                    <fieldset>
                        <legend>Cars List</legend>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Cars Name</th>
                                    <th>Prize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <th>{item.id}</th>
                                                <td>{item.Name}</td>
                                                <td>{item.Prise}</td>
                                                <td>
                                                    <button style={{ color: "#5c3502", cursor: "pointer" }} onClick={() => selectUser(item.id)} >Update</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Link to="/AddItem">
                            <button style={{ color: "#5c3502", cursor: "pointer" }} >ADD ITEM</button>
                        </Link>
                    </fieldset>
                </div>
                <div id="sideBar">
                    <input type='text' value={Name} Name='Name' onChange={(e) => setName(e.target.value)} /><br /><br />
                    <input type='text' value={Prise} Name='Prise' onChange={(e) => setPrise(e.target.value)} /><br /><br />
                    <button onClick={OnUpdate}>Update item!</button>

                </div>
            </div>
        </>
    )
}

export default Home