import React from "react";

type AstroAndWindProps = {
  sunrise: string;
  sunset: string;
  windSpeed: number;
};

function AstroAndWind(props: AstroAndWindProps) {
  const { sunrise, sunset, windSpeed } = props;
  return (
    <div className="grid lg:grid-cols-3 gap-4 h-full">
      <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
        <p className="flex items-center justify-start gap-4 text-stone-500 xl:text-lg md:text-md text-xs">
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
            className="lucide lucide-sunrise"
          >
            <path d="M12 2v8" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="m8 6 4-4 4 4" />
            <path d="M16 18a4 4 0 0 0-8 0" />
          </svg>
          SUNRISE
        </p>
        <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffae00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sunrise"
          >
            <path d="M12 2v8" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="m8 6 4-4 4 4" />
            <path d="M16 18a4 4 0 0 0-8 0" />
          </svg>
          <p className="font-semibold text-xl text-slate-300">{sunrise}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
        <p className="flex items-center justify-start gap-4 text-stone-500 xl:text-lg md:text-md text-xs">
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
            className="lucide lucide-sunset"
          >
            <path d="M12 10V2" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="m16 6-4 4-4-4" />
            <path d="M16 18a4 4 0 0 0-8 0" />
          </svg>
          SUNSET
        </p>
        <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffae00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sunset"
          >
            <path d="M12 10V2" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="m16 6-4 4-4-4" />
            <path d="M16 18a4 4 0 0 0-8 0" />
          </svg>
          <p className="font-semibold text-xl text-slate-300">{sunset}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
        <p className="flex items-center justify-start gap-4 text-stone-500 xl:text-lg md:text-md text-xs">
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
            className="lucide lucide-wind"
          >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
          </svg>
          WIND SPEED
        </p>
        <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0084ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-wind"
          >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
          </svg>
          <p className="font-semibold text-xl text-slate-300">
            {windSpeed} km/hr
          </p>
        </div>
      </div>
    </div>
  );
}

export default AstroAndWind;
