import React, { useContext, useEffect, useState } from "react";
import { MarketplaceContext } from "../MarketplaceContext";
import "./userDashBoard.css";
import { getDataFromAPI, postDataToAPI } from "../../utils/ApiRequestUtil";
import { useNavigate } from "react-router-dom";
import UserPageScreens from "../userPageScreens/UserPageScreens";
import { displayScreen, item } from "../../types/marketplaceTypes";

const UserDashBoard = () => {
  let navigate = useNavigate();
  const[displayScreen, setDisplayScreen]= useState<displayScreen>({
    homeScreen:true,
    createItemScreen:false,
    myInventoryScreen:false
  })

  const {userInfo,setUserInventory } = useContext(MarketplaceContext);

  useEffect(()=>{
    (async ()=>{
        const userInventory = await getDataFromAPI('/itemsByUser/'.concat(userInfo.id))
        setUserInventory(userInventory as item []);
    })();
},[displayScreen])

  const navBarButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    switch(event.currentTarget.id){
      case 'create-item-page':    
        setDisplayScreen({
          homeScreen:false,
          createItemScreen:true,
          myInventoryScreen:false
        })
        break;
      case 'my-inventory':
        setDisplayScreen({
          homeScreen:false,
          createItemScreen:false,
          myInventoryScreen:true
        })
        break;
        default:       
          setDisplayScreen({
            homeScreen:true,
            createItemScreen:false,
            myInventoryScreen:false
          })
    }

  };

  return (
    <div className="user-dashboard-container">
      <div className="header">
        <label> Welcome {userInfo.firstName + " " + userInfo.lastName}</label>
        <button type='button' id='logout' onClick={()=>navigate('/')}> Log out</button>
      </div>
      <div className="nav-bar">
        <ul>
          <li>
            <button type="button" id="Home" onClick={navBarButtonHandler}>
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              id="create-item-page"
              onClick={navBarButtonHandler}
            >
              Create Item
            </button>
          </li>
          <li>
            <button
              type="button"
              id="my-inventory"
              onClick={navBarButtonHandler}
            >
              My Inventory
            </button>
          </li>
        </ul>
      </div>
      <div>
        <UserPageScreens {...displayScreen} />
      </div>
    </div>
  );
};
export default UserDashBoard;
