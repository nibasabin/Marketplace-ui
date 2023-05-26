import React, { useContext, useState } from "react";
import "./createItemPage.css";
import { postDataToAPI } from "../../utils/ApiRequestUtil";
import { MarketplaceContext } from "../MarketplaceContext";
import { item } from "../../types/marketplaceTypes";

const CreateItemPage = () => {
  const [itemObject, setItemObject] = useState<item>({
    id: '',
    name:'',
    category:'',
    image:new Blob(),
    description: '',
    price:0,
    status: 'Available',
    isPosted: false,
    sellerID:'',
    firstName:'',
    lastName:'',
  });
  const { userInfo,getUserInventory } = useContext(MarketplaceContext);
  const createItemHandler = async () => {
    const newItemObject = {
      ...itemObject,
      sellerID: userInfo.id,
    };
 
    const apiResult = await postDataToAPI("/createItem", newItemObject);
    if (apiResult.status === "SUCCESS") {
      alert("Item created Successfully.");
      setItemObject({
        id: '',
        name:'',
        category:'',
        image:new Blob(),
        description: '',
        price:0,
        status: 'Available',
        isPosted: false,
        sellerID:'',
        firstName:'',
        lastName:'',
      }
      );
      getUserInventory()
      //setUserInventory((prev)=>({...prev,newItemObject}))
    } else {
      alert("Error:Item could not be created");
    }
  };

  const cancelItemHandler = () => {
    setItemObject({
      id: '',
      name:'',
      category:'',
      image:new Blob(),
      description: '',
      price:0,
      status: 'Available',
      isPosted: false,
      sellerID:'',
      firstName:'',
      lastName:'',
    });
  };
  return (
    <div className="create-item-container">
      <div className="create-item-header">
        <label>Create your Item for listing.</label>
      </div>
      <div className="create-item-form">
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  className="form-input"
                  type="text"
                  onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      name: value,
                    }));
                  }}
                  value={itemObject.name}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Category</label>
              </td>
              <td>
                <input
                  className="form-input"
                  type="text"
                  value={itemObject.category}
                  onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      category: value,
                    }));
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Price</label>
              </td>
              <td>
                <input
                  className="form-input"
                  type='number'
                  value={itemObject.price}
                  onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      price:parseInt(value),
                    }));
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                {" "}
                <textarea
                  className="form-input"
                  rows={4}
                  cols={30}
                  maxLength={1000}
                  value={itemObject.description}
                  onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      description: value,
                    }));
                  }}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label>Status</label>
              </td>
              <td>
                <select className="form-input"                   onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      status: value,
                    }));
                  }}>
                  <option>Available</option>
                  <option>Sold</option>
                  <option>Unavailable</option>
                </select>

              </td>
            </tr>
            <tr>
              <td>
                <label>List For Sale</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={({ target: { value } }) => {
                    setItemObject((prevState) => ({
                      ...prevState,
                      isPosted: value === "on" ? true : false,
                    }));
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Image</label>
              </td>
              <td>
                <input
                  className="form-input"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  // onChange={({ target }) => {
                  //   setItemObject((prevState) => ({
                  //     ...prevState,
                  //     image: null,
                  //   }));
                  // }}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="create-item-footer">
          <button type="button" onClick={createItemHandler}>
            Create Item
          </button>
          <button type="button" onClick={cancelItemHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateItemPage;
