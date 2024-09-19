import { Inter } from "next/font/google";
import MenuAppBar from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MenuAppBar />
    </>
  );
}
