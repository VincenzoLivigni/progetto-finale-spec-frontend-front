import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import OverlayCompare from "../components/OverlayCompare"
import BoardGamesCard from "../components/BoardGamesCard"

export default function BoardGamesList() {

    const {
        filteredBoardGames,
        search,
        setSearch,
        category,
        setCategory,
        sortOrder,
        setSortOrder,
        compareGames,
        compareBoardGames,
        favorites,
        toggleFavorites
    } = useContext(GlobalContext)

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
                    <BoardGamesCard
                        key={bg.id}
                        bg={bg}
                        compareBoardGames={compareBoardGames}
                        isCompared={compareGames.some((game) => game.id === bg.id)}
                        toggleFavorites={toggleFavorites}
                        isFavorite={favorites.some((fav) => fav.id === bg.id)}
                    />
                ))
            }

            <OverlayCompare />
        </section>
    )
}