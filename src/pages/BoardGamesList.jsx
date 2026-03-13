import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom"

export default function BoardGamesList() {

    const { boardGames, filteredBoardGames, search, setSearch } = useContext(GlobalContext)

    return (
        <section>
            <h3>Lista Giochi da tavolo</h3>

            <div>
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {
                filteredBoardGames.map((bg) => (
                    <div key={bg.id} className="card_list mb-4">
                        <Link to={`/boardgames/${bg.id}`}>
                            <h5><span className="fw-bold">Titolo:</span> {bg.title}</h5>
                        </Link>
                        <p><span className="fw-bold">Categoria:</span> {bg.category}</p>
                    </div>
                ))
            }
        </section>
    )
}