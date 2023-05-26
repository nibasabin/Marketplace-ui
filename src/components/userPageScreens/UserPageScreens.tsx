import React, { useContext } from "react";
import { MarketplaceContext } from "../MarketplaceContext";
import { postDataToAPI } from "../../utils/ApiRequestUtil";
import { displayScreen } from "../../types/marketplaceTypes";
import ManageInventory from "../manageInventory/ManageInventory";
import CreateItemPage from "../createItemPage/CreateItemPage";
import "./userPageScreens.css";

const UserPageScreens = (displayScreen: displayScreen) => {
  const { publicDashBoardData,getAllInventory } =
    useContext(MarketplaceContext);

  const buyButtonHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const itemId = event.currentTarget.id;
    const apiResult = await postDataToAPI("/buyItem/".concat(itemId), {});
    if (apiResult.status === "SUCCESS") {
      alert("Item with item id".concat(itemId).concat(" bought successfully"));
      getAllInventory();
    } else {
      alert(apiResult.error);
    }
  };

  return (
  <>
      {displayScreen.homeScreen && (
        <div>
                <div className="header">
        <label>Marketplace Items</label>
      
        </div>
        <div className="user-dashboard-table">
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
                <th>Seller Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { publicDashBoardData &&
                publicDashBoardData.map(
                  (item) =>
                  ( item.isPosted ? (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        {/* <td><img src={URL.createObjectURL(item.image)} width={"250px"} alt={item.name}></img></td> */}
                        <td>image</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                        <td>{item.firstName}{" "} {item.lastName}</td>
                        <td>
                          {item.status === 'Available' && <button
                            type="button"
                            id={item.id}
                            onClick={buyButtonHandler}
                          >
                            Buy Item
                          </button>
}
                        </td>
                      </tr>): ''
                    )
                )}
            </tbody>
          </table>
        </div>
        </div>
      )}
      {displayScreen.createItemScreen && <CreateItemPage />}
      {displayScreen.myInventoryScreen && <ManageInventory />}
  </>
  );
};

export default UserPageScreens;
