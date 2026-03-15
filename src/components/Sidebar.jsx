import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom"

export default function Sidebar() {

    const { favorites, toggleFavorites, clearFavorites } = useContext(GlobalContext)

    return (
        <div className="offcanvas offcanvas-end" id="offcanvas">
            <button className="favorite_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
                <span>💜</span>
            </button>

            <div className="offcanvas-header">
                <h1 className="offcanvas-title">Preferiti</h1>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">
                {favorites.length === 0 ? (
                    <p>Nessun preferito</p>
                ) : (favorites.map(bg => (
                    <div key={bg.id}>
                        <Link to={`/boardgames/${bg.id}`}>
                            <h5><span className="fw-bold">Titolo:</span> {bg.title}</h5>
                        </Link>

                        <button onClick={() => toggleFavorites(bg)}>
                            🧡
                        </button>
                    </div>
                ))
                )
                }

                {favorites.length > 0 && <button onClick={clearFavorites} className="clear_favorites">
                    Svuota preferiti
                </button>
                }
            </div>
        </div>
    )
}