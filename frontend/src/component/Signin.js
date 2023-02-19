import React, { useState } from "react";
import { json, Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const navigate = useNavigate()


    const postData = () => {

        //email validation throuth regex
        if (!emailRegex.test(email)) {
            notifyA("Invalid email");
            return
        }

        //sending data to server
        fetch("http://localhost:5000/signin", {
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
                notifyA(data.error);
            } else {
                notifyB(data.message)
                navigate("/")
            }

            console.log(data)
        })
        localStorage.setItem("additem",JSON.stringify(email))
    }

    return (
        <>
            <div className="main">
                <div id="sideBar">
                    <fieldset>
                        <legend>SignIn 👍</legend>
                        <div><label><span>Email:<input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></span></label></div>
                        <div><label><span>Password:</span><input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }}/></label></div><br /><br />
                        <button onClick={() => { postData() }} >sign in</button><br /> <br />
                        <br />
                    </fieldset>
                </div>
            </div>
        </>
    );
};

export default SignIn;
