import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

export default function OverlayCompare() {

    const { compareGames, clearCompare } = useContext(GlobalContext)

    return (
        <>
            {
                compareGames.length === 2 && (
                    <section className="compare_overlay">
                        <div className="compare">
                            {compareGames.map(game => (
                                <div key={game.id} className="compare_card">
                                    <h5>Titolo: {game.title}</h5>
                                    <p>Categoria: {game.category}</p>
                                    <p>Descrizione: {game.description}</p>
                                    <p>Giocatori: {game.minPlayers} - {game.maxPlayers}</p>
                                    <p>Prezzo: {game.price}€</p>
                                </div>
                            ))}

                            <button onClick={clearCompare} className="close_compare">
                                X
                            </button>
                        </div>
                    </section>
                )
            }
        </>
    )
}