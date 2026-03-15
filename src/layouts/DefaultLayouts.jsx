import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


export default function DefaultLayout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
                <Sidebar />
            </main>

            <Footer />
        </>
    )
}