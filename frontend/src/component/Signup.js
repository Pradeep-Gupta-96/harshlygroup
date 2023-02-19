import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const SignUp = () => {

  const naviagate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //Toast function
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const postData = () => {

    //email validation throuth regex
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return
    } else if (!passwordRegex.test(password)) {
      notifyA("Password must contain 8 charecter at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:")
      return
    }

    //sending data to server
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        notifyA(data.error)
      } else {
        notifyB(data.message)
        naviagate("/signin")
      }

      console.log(data)
    })
  }

  return (
    <>
      <div classNAme="main">
        <div id="sideBar">
          <fieldset>
            <legend>SignUp 👍</legend> <br /><br />
            <div><label><span>Email:</span><input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /></label></div><br /> <br />
            <div><label><span>Password:</span><input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></label></div><br /><br />
            <button onClick={() => { postData() }} >register</button><br /> <br />
            already have an account <br />
            <Link to="/signin">
              <button style={{ color: "#5c3502", cursor: "pointer" }}>Sign In</button>
            </Link>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default SignUp
