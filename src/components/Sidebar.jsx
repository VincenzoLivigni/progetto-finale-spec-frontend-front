import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import BoardGamesCard from "./BoardGamesCard"

export default function Sidebar() {

    const {
        compareGames,
        compareBoardGames,
        favorites,
        toggleFavorites,
        clearFavorites } = useContext(GlobalContext)

    return (
        <div className="offcanvas offcanvas-end" id="offcanvas">

            <button className="favorite_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
                <i className="bi bi-heart-fill heart-active fs-6 p-1"></i>
            </button>

            <div className="offcanvas-header">
                <h3 className="offcanvas-title">Preferiti</h3>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">

                {
                    // gestione stato vuoto
                    favorites.length === 0 ? (
                        <p className="empty_states">Nessun preferito</p>
                    ) :

                        // preferiti + gestione comparazione e preferiti
                        favorites.map(bg => (
                            <div key={bg.id}>
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

                {favorites.length > 0 &&
                    <button onClick={clearFavorites} className="btn-clear_favorites px-2 rounded-2">
                        Svuota preferiti
                    </button>
                }
            </div>
        </div>
    )
}