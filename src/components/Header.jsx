import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header() {

    return (
        <header>
            <nav className="navbar navbar-expand-md p-0">

                <div className="container-fluid justify-content-center">
                    <NavLink to="/">
                        <img id="logo" src={logo} alt="#" />
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}