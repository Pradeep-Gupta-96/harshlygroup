import React, { useState } from 'react'
import {useNavigate } from "react-router-dom"

const AddItem = () => {
    const [Name, setName] = useState("")
    const [Prise, setPrise] = useState("")
    const naviagate = useNavigate()
    

    const onClick = () => {
        fetch("http://localhost:5000/api/Cars", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: Name,
                Prise: Prise
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                naviagate("/")
            }

            console.log(data)
        })
    }

  return (
    <>
    <div className="main">
      <div id="sideBar">
        <fieldset>
          <legend>ADD ITEM 🚗</legend>
          <div><label><span>Cars Name:</span><input type="text" name="Name"  value={Name} onChange={(e) => setName(e.target.value)} placeholder='Car Name' /></label></div>
          <div><label><span>Prize:</span><input type="text" name="prise" value={Prise}  onChange={(e) => setPrise(e.target.value)}  placeholder='prise'  /></label></div>
          <button onClick={() => { onClick() }} >add item</button><br /> <br />
        </fieldset>
      </div>
    </div>
  </>
  )
}

export default AddItem