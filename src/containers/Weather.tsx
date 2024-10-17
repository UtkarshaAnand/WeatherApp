import React, { useState } from "react";

function Weather() {
  return (
    <div
      className="grid place-items-center min-h-screen w-full bg-cover brightness-200 lg:p-16 p-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg-rainy.jpg)`,
      }}
    >
      <div className="grid lg:grid-cols-12 h-full p-8 gap-8 rounded-3xl backdrop-blur-sm bg-black/20">
        <div className="grid lg:gap-2 gap-8 lg:col-span-4 rounded-2xl">
          <div className="row-span-1 lg:h-2/3 flex items-center justify-start bg-neutral-800 opacity-75 rounded-full p-2">
            <div className="flex items-center justify-start lg:py-0 px-4 gap-2 text-stone-400 lg:text-lg text-sm font-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Bangalore, India
            </div>
          </div>
          <div className="row-span-11 grid grid-rows-2 p-4 rounded-2xl backdrop-blur-sm bg-black/20">
            <div className="px-4 lg:flex items-center justify-center">
              <div className="text-center">
                <p className="md:text-7xl font-bold text-5xl md:mb-4 mb-2 text-stone-500">
                  28&deg;
                </p>
                <p className="md:text-4xl text-lg md:mb-8 mb-2 text-stone-500">
                  Rainy Day
                </p>
                <p className="xl:text-lg lg:text-md text-xs text-white font-light">
                  Today, expect a rainy day with temperatures reaching a maximum
                  of 28°C. Make sure to grab your umbrella and raincoat before
                  heading out.
                </p>
              </div>
            </div>
            <div className="grid grid-flow-row 2xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-4 p-8">
              <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
                <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-thermometer xl:size-6 size-4"
                  >
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                  </svg>
                  Feels like
                </p>
                <div className="px-8 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
                  25&deg;
                </div>
              </div>
              <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
                <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud-rain-wind xl:size-6 size-4"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="m9.2 22 3-7" />
                    <path d="m9 13-3 7" />
                    <path d="m17 13-3 7" />
                  </svg>
                  Precipitation
                </p>
                <div className="px-8 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
                  67%
                </div>
              </div>
              <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
                <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-droplets xl:size-6 size-4"
                  >
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
                  </svg>
                  Humidity
                </p>
                <div className="px-8 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
                  56%
                </div>
              </div>
              <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
                <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye xl:size-6 size-4"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Visibility
                </p>
                <div className="px-8 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
                  300m
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:col-span-8 rounded-2xl">
          <div className="p-8 rounded-xl backdrop-blur-sm bg-black/40">
            <p className="lg:flex items-center justify-start gap-4 text-stone-500 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              HOURLY FORECAST
            </p>
            <hr className="h-px my-4 bg-stone-500 border-0 opacity-40"></hr>
            <span className="text-slate-300">Technical advisor</span>
          </div>
          <div className="p-8 rounded-xl backdrop-blur-sm bg-black/40">
            <p className="lg:flex items-center justify-start gap-4 text-stone-500 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              7 DAY FORECAST
            </p>
            <hr className="h-px my-4 bg-stone-500 border-0 opacity-40"></hr>
            <span className="text-slate-300">Technical advisor</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl backdrop-blur-sm bg-black/40">
              <p className="lg:flex items-center justify-start gap-4 text-stone-500 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-haze"
                >
                  <path d="m5.2 6.2 1.4 1.4" />
                  <path d="M2 13h2" />
                  <path d="M20 13h2" />
                  <path d="m17.4 7.6 1.4-1.4" />
                  <path d="M22 17H2" />
                  <path d="M22 21H2" />
                  <path d="M16 13a4 4 0 0 0-8 0" />
                  <path d="M12 5V2.5" />
                </svg>
                SUNRISE
              </p>
              <hr className="h-px my-4 bg-stone-500 border-0 opacity-40"></hr>
              <span className="text-slate-300">Technical advisor</span>
            </div>
            <div className="p-8 rounded-xl backdrop-blur-sm bg-black/40">
              <p className="lg:flex items-center justify-start gap-4 text-stone-500 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-haze"
                >
                  <path d="m5.2 6.2 1.4 1.4" />
                  <path d="M2 13h2" />
                  <path d="M20 13h2" />
                  <path d="m17.4 7.6 1.4-1.4" />
                  <path d="M22 17H2" />
                  <path d="M22 21H2" />
                  <path d="M16 13a4 4 0 0 0-8 0" />
                  <path d="M12 5V2.5" />
                </svg>
                SUNSET
              </p>
              <hr className="h-px my-4 bg-stone-500 border-0 opacity-40"></hr>
              <span className="text-slate-300">Technical advisor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
