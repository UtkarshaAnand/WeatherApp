import React from "react";

function Weather() {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat."
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg-rainy.jpg)` }}
    >
      <div className="absolute flex flex-col gap-6 top-40 right-28 w-1/4">
        <div className="h-80 p-8 rounded-lg backdrop-brightness-200">
          <div className="">
            <p className="text-slate-200 text-lg">Patchy rain nearby</p>
            <hr className="h-px my-2 bg-slate-200 border-0 opacity-25"></hr>
            <span>Technical advisor</span>
          </div>
        </div>
        <div className="h-80 p-8 rounded-lg backdrop-blur-lg backdrop-brightness-150">
          <div className="">
            <p className="text-slate-200 text-lg">Patchy rain nearby</p>
            <hr className="h-px my-2 bg-slate-200 border-0 opacity-40"></hr>
            <span>Technical advisor</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
