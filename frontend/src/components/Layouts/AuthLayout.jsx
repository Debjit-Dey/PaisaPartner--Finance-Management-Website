import React from "react";
import IMG1 from "../../assets/images/img1.jpeg";
import { LuTrendingUpDown } from "react-icons/lu";

const LIGHT_BLUE = "#90CAF9"; // Light blue for icons and accents
const DARK_BLUE = "#64B5F6"; // Slightly deeper blue for gradients

const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background:
          "linear-gradient(120deg, #E3F2FD 0%, #BBDEFB 60%, #90CAF9 100%)",
      }}
    >
      <div className="w-screen min-h-screen md:w-[60vw] flex flex-col items-center justify-center px-4 md:px-12 pb-12 relative">
        {/* Decorative blurred circle */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-60 -z-10" />
        <h2 className="mt-6 mb-2 tracking-tight">
          <span
            className="block text-4xl font-extrabold"
            style={{
              color: "#1976D2",
              letterSpacing: "2px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            PaisaPartner
          </span>
          <span
            className="block text-base font-light text-gray-600 mt-1"
            style={{ fontFamily: "Roboto, sans-serif", letterSpacing: "1px" }}
          >
            Management of Your Financial Journey with Ease
          </span>
        </h2>
        {/* Card effect for children */}
        <div className="w-full max-w-2xl bg-white/90 shadow-2xl rounded-3xl p-4 md:p-12 mt-8 border border-gray-100 backdrop-blur-lg transition-all duration-300 flex flex-col items-center">
          {children}
        </div>
        {/* Decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-100 rounded-full opacity-60" />
      </div>
      <div
        className="hidden md:block w-[40vw] h-screen bg-cover bg-no-repeat overflow-hidden p-8 relative"
        style={{
          background:
            "linear-gradient(120deg, #E3F2FD 0%, #BBDEFB 60%, #90CAF9 100%)",
        }}
      >
        {/* Decorative shapes */}
        <div
          className="w-48 h-48 rounded-[40px]"
          style={{
            background: LIGHT_BLUE,
            position: "absolute",
            top: "-28px",
            left: "-20px",
          }}
        />
        <div
          className="w-48 h-36 rounded-[40px] border-[20px]"
          style={{
            borderColor: LIGHT_BLUE,
            position: "absolute",
            top: "22%",
            right: "-40px",
          }}
        />
        <div
          className="w-48 h-48 rounded-[40px]"
          style={{
            background: LIGHT_BLUE,
            position: "absolute",
            top: "320px",
            left: "-20px",
          }}
        />
        {/* New subtle background accent */}
        <div className="absolute right-10 top-1/3 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-50 -z-10" />
        <div className="grid grid-cols-1 gap-6 z-20 mt-8">
          <StartsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expense"
            value="220,000"
            color="bg-[#90CAF9]" // Light blue
          />
          <StartsInfoCard
            icon={<LuTrendingUpDown />}
            label="Total Savings"
            value="80,000"
            color="bg-[#90CAF9]" // Light blue
          />
          {/* Minimalistic vertical progress bar */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-2 h-24 bg-blue-100 rounded-full relative">
              <div
                className="absolute bottom-0 w-2 h-16"
                style={{
                  background: LIGHT_BLUE,
                  borderRadius: "9999px",
                  transition: "all 0.5s",
                }}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">Monthly Progress</span>
          </div>
          <img
            src={IMG1}
            alt="Decorative"
            className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-200/30 rounded-3xl opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StartsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-blue-50 p-4 rounded-xl shadow-md shadow-blue-100/30 border border-blue-100 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-blue-700 mb-1">{label}</h6>
        <span className="text-[20px] text-blue-800"> ₹{value}</span>
      </div>
    </div>
  );
};
