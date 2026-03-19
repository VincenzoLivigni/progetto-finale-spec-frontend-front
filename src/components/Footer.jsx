import logo from "../assets/logo.png"

export default function Footer() {

    return (
        <footer className="pt-2 pb-3">
            <div className="container text-center">

                <div>
                    <img src={logo} id="logo" />
                </div>

                <div>
                    <p className="mb-3">Scopri e confronta i migliori giochi da tavolo </p>
                    <small className="text-muted">© 2026 Dice Duel App</small>
                </div>

            </div>
        </footer>
    )
}