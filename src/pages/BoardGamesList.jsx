import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom"

export default function BoardGamesList() {

    const { filteredBoardGames, search, setSearch, category, setCategory, sortOrder, setSortOrder, compareGames, compareBoardGames, clearCompare } = useContext(GlobalContext)

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

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="seleziona">Seleziona</option>
                    <option value="bluff">Bluff</option>
                    <option value="cooperativo">Cooperativo</option>
                    <option value="creativo">Creativo</option>
                    <option value="deduzione">Deduzione</option>
                    <option value="economico">Economico</option>
                    <option value="investigativo">Investigativo</option>
                    <option value="strategia">Strategia</option>
                    <option value="party">Party</option>
                </select>

                <span>Ordina per titolo</span>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="ordina">Ordina</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>

            {
                filteredBoardGames.map((bg) => (
                    <div key={bg.id} className="card_list mb-4">
                        <Link to={`/boardgames/${bg.id}`}>
                            <h5><span className="fw-bold">Titolo:</span> {bg.title}</h5>
                        </Link>
                        <p><span className="fw-bold">Categoria:</span> {bg.category}</p>

                        <button onClick={() => compareBoardGames(bg)}>
                            {compareGames.find(game => game.id === bg.id)
                                ? "Annulla confronto" : "Confronta"}
                        </button>
                    </div>
                ))
            }

            {compareGames.length === 2 && (
                <section className="compare_overlay">
                    <div className="compare">
                        {compareGames.map(game => (
                            <div key={game.id} className="compare_card">
                                <h5>Titolo: {game.title}</h5>
                                <p>Categoria: {game.category}</p>
                                <p>Descrizione: {game.description}</p>
                                <p>Players: {game.minPlayers}-{game.maxPlayers}</p>
                                <p>Prezzo: {game.price}€</p>
                            </div>
                        ))}

                        <button onClick={clearCompare} className="close_compare">
                            X
                        </button>
                    </div>
                </section>
            )}
        </section>
    )
}