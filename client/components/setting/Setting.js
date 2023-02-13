import React from "react";

export default function Setting() {
  return (
    <div className="flex flex-col bg-orange-200 p-4 h-[90vh]  items-center">
      <div className="bg-orange-400 rounded-xl shadow-xl w-full md:w-[60%] p-4 lg:w-[40%] mt-8 flex flex-col space-y-6">
        <h1 className="text">update wallet details</h1>
        <form className="w-full  mt-8 flex flex-col space-y-6">
          <div className="input-container">
            <label className="label-white-bg">bitcoin</label>
            <input type="text" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg">USDT</label>
            <input type="text" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg">litecoin</label>
            <input type="text" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg">ethereum</label>
            <input type="text" className="input" />
          </div>
          <div className="action">
            <button className="button">update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
