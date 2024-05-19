import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default function Layout() {

    return (
        <div
            className="min-h-[100vh] bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white flex flex-col transition-colors duration-300">
            <Header/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}