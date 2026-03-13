import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

export default function BoardGamesList() {

    const { boardGames } = useContext(GlobalContext)

    return (
        <section>
            <h3>Lista Giochi da tavolo</h3>

            {
                boardGames.map((bg) => (
                    <div key={bg.id} className="card_list mb-4">
                        <h5><span className="fw-bold">Titolo:</span> {bg.title}</h5>
                        <p><span className="fw-bold">Categoria:</span> {bg.category}</p>
                    </div>
                ))
            }
        </section>
    )
}