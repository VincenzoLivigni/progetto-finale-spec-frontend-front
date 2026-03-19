import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom"

export default function OverlayCompare() {

    const { compareGames, clearCompare } = useContext(GlobalContext)

    return (
        <>
            {
                compareGames.length === 2 && (
                    <section className="compare_overlay">
                        <div className="compare">

                            {compareGames.map(game => (
                                <div key={game.id} className="compare_card rounded-2">
                                    <h5>
                                        <span className="fw-bold">Titolo: </span>
                                        <Link className="link" to={`/boardgames/${game.id}`}>{game.title}</Link>
                                    </h5>
                                    <p><span className="fw-bold">Categoria:</span> {game.category}</p>
                                    <p className="description"><span className="fw-bold">Descrizione:</span> {game.description}</p>
                                    <p><span className="fw-bold">Giocatori:</span> {game.minPlayers} - {game.maxPlayers}</p>
                                    <p><span className="fw-bold">Prezzo:</span> {game.price}€</p>
                                </div>
                            ))}

                            <button onClick={clearCompare} className="close_compare">
                                <i className="bi bi-x fs-5"></i>
                            </button>

                        </div>
                    </section>
                )
            }
        </>
    )
}