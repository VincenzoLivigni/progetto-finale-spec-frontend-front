import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import OverlayCompare from "../components/OverlayCompare"
import BoardGamesCard from "../components/BoardGamesCard"
import Filters from "../components/Filters"

export default function BoardGamesList() {

    const {
        filteredBoardGames,
        compareGames,
        compareBoardGames,
        favorites,
        toggleFavorites,
    } = useContext(GlobalContext)

    return (
        <main>
            <section className="section_list py-4">
                <h3>Lista Giochi da tavolo</h3>

                <Filters />
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-5">
                    {
                        filteredBoardGames.map((bg) => (
                            <div key={bg.id} className="col">
                                <BoardGamesCard
                                    bg={bg}
                                    compareBoardGames={compareBoardGames}
                                    isCompared={compareGames.some((game) => game.id === bg.id)}
                                    toggleFavorites={toggleFavorites}
                                    isFavorite={favorites.some((fav) => fav.id === bg.id)}
                                />
                            </div>
                        ))
                    }
                </div>

                <OverlayCompare />

            </section>
        </main>
    )
}