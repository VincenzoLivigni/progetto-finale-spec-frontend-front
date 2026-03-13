import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;

export default function BoardGamesDetail() {

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
                    <div className="card_bg_detail mb-4">
                        <h5><span className="fw-bold">Titolo:</span> {boardgame.title}</h5>
                        <p><span className="fw-bold">Categoria:</span> {boardgame.category}</p>
                        <p><span className="fw-bold">Brand:</span> {boardgame.brand}</p>
                        <p><span className="fw-bold">Description:</span> {boardgame.description}</p>
                        <p><span className="fw-bold">Players:</span> {boardgame.minPlayers} - {boardgame.maxPlayers}</p>
                        <p><span className="fw-bold">Price:</span> {boardgame.price}€</p>
                    </div>
                )
            }
        </section>
    )
}