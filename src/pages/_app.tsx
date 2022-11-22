import "../styles/globals.css";
import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
// import localFont from "@next/font/local";

// const abb = localFont({
//   src: [
//     {
//       path: "./fonts/ABBvoice_W_Rg.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ABBvoice_W_Md.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ABBvoice_W_Bd.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ABBvoice_W_Lt.woff2",
//       weight: "300",
//       style: "normal",
//     },
//   ],
//   variable: "--font-abb",
// });

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
