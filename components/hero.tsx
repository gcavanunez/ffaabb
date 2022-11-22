import Image from "next/image";
import cvt from "../public/images/cvt.png";

export default function Hero() {
  return (
    <div className="mx-auto text-center">
      <div className="mx-auto w-48">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655.21 272.77">
          <path
            d="M573.13 129c-5.91-7.92-13.56-14.45-22.54-18.81 10.55-7.32 17.47-19.5 17.47-33.31 0-23.11-15.73-40.54-44.59-40.54h-11.4V129h61.05ZM450.3 36.34h55.98V129H450.3zm0 98.46h55.98v92.66H450.3zm61.78 0v92.66h11.4c37.95 0 61.96-26.87 61.96-61.77 0-11.3-3.14-21.8-8.44-30.89h-64.92ZM241.75 129l-32.76-92.66h-25.1V129h57.86zm-63.65 0V36.34H153L120.24 129h57.86zm0 5.8h-59.91l-32.76 92.66h48.27l13.51-38.61h30.89V134.8zm5.79 0v54.05h30.89l13.51 38.61h48.26l-32.76-92.66h-59.9zm230.94-5.8c-5.91-7.92-13.56-14.45-22.54-18.81 10.55-7.32 17.47-19.5 17.47-33.31 0-23.11-15.73-40.54-44.59-40.54h-11.4V129h61.05ZM292 36.34h55.98V129H292zm0 98.46h55.98v92.66H292zm61.78 0v92.66h11.4c37.95 0 61.96-26.87 61.96-61.77 0-11.3-3.14-21.8-8.44-30.89h-64.92Z"
            style={{
              fill: "#ff000f",
            }}
          />
        </svg>
      </div>
      <div className="pt-4">
        <p className="text-white text-xl">Es hora de crear nuevos recuerdos</p>
      </div>
      <div className="flex justify-center">
        <Image src={cvt} alt="Como los viejos tiempos" placeholder="blur" />
      </div>
    </div>
  );
}
