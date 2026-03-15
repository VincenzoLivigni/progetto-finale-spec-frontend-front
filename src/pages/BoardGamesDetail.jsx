import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext";
import BoardGamesDetailCard from "../components/BoardGamesDetailCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function BoardGamesDetail() {

    const { toggleFavorites, favorites } = useContext(GlobalContext)

    const { id } = useParams()

    const [boardgame, setBoardGame] = useState(null)

    const fetchBoardGamesDetail = async () => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`)
            const data = await res.json()
            setBoardGame(data.product)
        }
        catch (err) {
            console.log("Errore nella ricezione dei dettagli dei giochi da tavolo", err);
        }
    }

    useEffect(() => {
        fetchBoardGamesDetail()
    }, [id])

    return (
        <section>

            <h3>Dettaglio Gioco da tavolo</h3>
            {
                boardgame && (
                    <BoardGamesDetailCard
                        key={boardgame.id}
                        boardGame={boardgame}
                        toggleFavorites={toggleFavorites}
                        isFavorite={favorites.some((fav) => fav.id === boardgame.id)}
                    />
                )
            }
        </section>
    )
}