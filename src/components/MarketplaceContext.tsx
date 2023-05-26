import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage.tsx";
import SignupPage from "./signupPage/SignupPage.tsx";
import UserDashBoard from "./userDashBoard/UserDashBoard.tsx";
import { getDataFromAPI } from "../utils/ApiRequestUtil.ts";
import { item, userInfo } from "../types/marketplaceTypes.ts";

interface MarketPlaceContextValue {
  userInventory: item[];
  publicDashBoardData: item[];
  setUserInventory: React.Dispatch<React.SetStateAction<item[]>>;
  setPublicDashBoardData: React.Dispatch<React.SetStateAction<item[]>>;
  userInfo: userInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfo>>;
  getUserInventory: () => void;
  getAllInventory:()=>void;
}
export const MarketplaceContext = React.createContext<MarketPlaceContextValue>(
  {} as MarketPlaceContextValue
);
const MarketplaceApp: FC<React.PropsWithChildren<unknown>> = () => {
  const [userInventory, setUserInventory] = useState<item[]>([]);
  const [publicDashBoardData, setPublicDashBoardData] = useState<item[]>([]);
  const [userInfo, setUserInfo] = useState<userInfo>({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    (async () => {
      const apiResponse = await getDataFromAPI("/items");
      setPublicDashBoardData(apiResponse as item[]);
    })();
  }, [userInventory]);

  const getUserInventory = async (): Promise<void> => {
    const userInventory = await getDataFromAPI(
      "/itemsByUser/".concat(userInfo.id)
    );
    setUserInventory(userInventory as item[]);
  };

  const getAllInventory = async (): Promise<void> => {
    const userInventory = await getDataFromAPI(
      "/items"
    );
    setPublicDashBoardData(userInventory as item[]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        userInventory: userInventory,
        publicDashBoardData: publicDashBoardData,
        setUserInventory,
        setPublicDashBoardData,
        userInfo,
        setUserInfo,
        getUserInventory,
        getAllInventory,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="user-dashboard" element={<UserDashBoard />} />
          <Route path="signup-page" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </MarketplaceContext.Provider>
  );
};
export default MarketplaceApp;
