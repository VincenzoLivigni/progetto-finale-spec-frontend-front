import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext";
import BoardGamesDetailCard from "../components/BoardGamesDetailCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function BoardGamesDetail() {

    const {
        compareGames,
        compareBoardGames,
        favorites,
        toggleFavorites } = useContext(GlobalContext)

    const { id } = useParams()

    // stati
    const [boardgame, setBoardGame] = useState(null)

    const [error, setError] = useState(false)

    // recupero dati del gioco con id specifico dall'API
    const fetchBoardGamesDetail = async () => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`)

            if (!res.ok) {
                throw new Error(`Errore: ${res.status}`)
            }

            const data = await res.json()
            setBoardGame(data.product)
        }
        catch (err) {
            console.log("Errore nella ricezione dei dettagli dei giochi da tavolo", err);
            setError(true)
        }
    }

    useEffect(() => {
        fetchBoardGamesDetail()
    }, [id])

    return (
        <section className="py-4">

            <div className="container">
                <h3>Dettaglio Gioco da tavolo</h3>
                {
                    // messaggio di errore in caso di problemi con l'api
                    error === true ? (
                        <p className="error">Oops... Si è verificato un errore nel caricamento del gioco</p>
                    ) :

                        // dettaglio gioco + gestione comparazione e preferiti
                        boardgame && (
                            <BoardGamesDetailCard
                                key={boardgame.id}
                                boardGame={boardgame}
                                compareBoardGames={compareBoardGames}
                                isCompared={compareGames.some((game) => game.id === boardgame.id)}
                                toggleFavorites={toggleFavorites}
                                isFavorite={favorites.some((fav) => fav.id === boardgame.id)}
                            />
                        )
                }
            </div>
        </section>
    )
}