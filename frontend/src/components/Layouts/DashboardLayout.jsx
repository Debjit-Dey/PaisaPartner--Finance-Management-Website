import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div
          className="flex"
          style={{
            background:
              "linear-gradient(120deg, #4e54c8 0%, #8f94fb 60%, #4e54c8 100%)",
          }}
        >
          <div className="max-[1080px]:hidden ">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div
            className="grow mx-5"
            style={{
              background:
                "linear-gradient(120deg, #f5f7fa 0%, #e0e5ec 60%, #f5f7fa 100%)",
              minHeight: "100vh",
              borderRadius: "18px",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
