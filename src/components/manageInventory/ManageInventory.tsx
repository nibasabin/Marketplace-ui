import React, { useContext, useState } from "react";
import "./manageInventory.css";
import { MarketplaceContext } from "../MarketplaceContext";
import { postDataToAPI } from "../../utils/ApiRequestUtil";

const ManageInventory = () => {
  const { userInventory,getUserInventory } = useContext(MarketplaceContext);

  const putOnMarketHandler: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    const itemToUpdate = userInventory.find((item)=> parseInt(item.id) === parseInt(event.currentTarget.id))
    let requestBody ={};
    if(itemToUpdate?.isPosted){
       requestBody= {...itemToUpdate, isPosted: false}
    }else{
       requestBody= {...itemToUpdate, isPosted: true}
    }

    const apiResult = await postDataToAPI('/editItem/'.concat(event?.currentTarget.id),requestBody as object);
    if (apiResult.status === "SUCCESS"){
      getUserInventory()
    }else{
      alert(apiResult.error);
    }
  };
  return (
    <div>
      <div className="header">
        <label>Manage Your Inventory</label>
      </div>
      <div className="body">
        <div className="manage-inventory-table">
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Image </th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Is in Market</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userInventory.length> 0 &&
                userInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    {/* <td><img src={URL.createObjectURL(item.image)} width={"250px"} alt={item.name}></img></td> */}
                    <td>image</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>{item.isPosted ? "true" : "false"}</td>
                    <td>
                      <button
                       // hidden={item.isPosted}
                        id={item.id}
                        onClick={putOnMarketHandler}
                      >
                        {item.isPosted ? 'Remove From Market' : 'Put on Market'}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};
export default ManageInventory;
