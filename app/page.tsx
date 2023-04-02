import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <div className="">
            <h1 className="text-white">Ini adalah Homepage dari Folder App</h1>
        </div>
    );
}
