import React, { useState } from "react";
import './signupPage.css';
import { postDataToAPI } from "../../utils/ApiRequestUtil";
import { useNavigate } from "react-router-dom";

const SignupPage = ()=> {
    const [registerData,setRegisterData]= useState({
        firstName:'',
        lastName:'',
        phone:'',
        username:'',
        password:'',
    });
    let navigate = useNavigate();
 const registerActionHandler = async ()=>{
    console.log('register button clicked');
    const requestBody ={
        firstName:registerData.firstName,
        lastName:registerData.lastName,
        phone:registerData.phone,
        username:registerData.username,
        password:registerData.password,
    }
    const apiResult = await postDataToAPI('/createUser',requestBody);
    if (apiResult.status === "SUCCESS"){
      alert("User created successfully")
      navigate("/");

    }else{
   alert(apiResult.error)
    }


 }   
return (
<div className='signup-page-container'>
    <label><h1>Registration</h1></label>
    <table>
        <tbody>
        <tr>
            <td>First Name</td>
            <td><input type='text' required onChange={({target:{value}})=>setRegisterData((prev)=>({...prev, firstName:value}))}/></td>
        </tr>
        <tr>
            <td>Last Name</td>
            <td><input type='text'onChange={({target:{value}})=>setRegisterData((prev)=>({...prev, lastName:value}))}/></td>
        </tr>
        <tr>
            <td>Phone No</td>
            <td><input maxLength= "10" type='text' onChange={({target:{value}})=>setRegisterData((prev)=>({...prev, phone:value}))}/></td>
        </tr>
        <tr>
            <td>Username</td>
            <td><input type='text' onChange={({target:{value}})=>setRegisterData((prev)=>({...prev, username:value}))} required/></td>
        </tr>
        <tr>
            <td>password</td>
            <td><input type='password' onChange={({target:{value}})=>setRegisterData((prev)=>({...prev, password:value}))} required/></td>
        </tr>
        </tbody>
    </table>
    <div className= "signup-page-buttons">

    <button type='button' onClick={registerActionHandler}>Submit</button>
    <button>Cancel</button>
    </div>
</div>
)
}
export default SignupPage