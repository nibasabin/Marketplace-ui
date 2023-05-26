import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { postDataToAPI } from "../../utils/ApiRequestUtil.ts";
import { MarketplaceContext } from "../MarketplaceContext.tsx";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError]= useState('');

 const {setUserInfo} = useContext(MarketplaceContext);
  let navigate = useNavigate();

  const loginClickHandler: React.MouseEventHandler<HTMLInputElement> = async () => {
    const requestBody = {
      'username':username,
      'password':password
    };

    const apiResult = await postDataToAPI('/login',requestBody);
    if (apiResult.status === "SUCCESS"){
      setUserInfo({
        id:apiResult.user.id,
        username:apiResult.user.username,
        password:apiResult.user.password,
        firstName:apiResult.user.firstName,
        lastName:apiResult.user.lastName,
        phone:apiResult.user.phone,
      })
      navigate("/user-dashboard");

    }else{
    setLoginError(apiResult.status);
    }
   
  };

  const registerHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/signup-page");
  };
  return (
    <div className="loginPageContainer">
      <h3>Rob's Marketplace </h3>

      <div>
        <table>
          <tbody>
          <tr>
            <td>
              {" "}
              <label>Username </label>
            </td>
            <td>
              {" "}
              <input type="text" name="username" onChange={(event)=>setUserName(event.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Password </label>
            </td>
            <td>
              <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)}/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className ="errormsg">
      { loginError &&
        <label>{loginError}</label>
      }
      </div>
      <div className="submitButton">
        <input type="submit" onClick={loginClickHandler} />
      </div>
      <div>
        <label>
          Not a member?{" "}
          <button
            type="button"
            className="registerButton"
            onClick={registerHandler}
          >
            {" "}
            Register
          </button>
        </label>
      </div>
    </div>
  );
};
export default LoginPage;
