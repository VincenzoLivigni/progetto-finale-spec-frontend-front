import { Link } from "react-router-dom";
import { memo } from "react";
import images from "../data/images";

function BoardGamesCard({ bg, compareBoardGames, isCompared, toggleFavorites, isFavorite }) {

    return (
        <div className="card_list mb-4 p-4 rounded-2">

            <div className="card-img">
                <img src={images[bg.id]} alt={bg.title} />
            </div>

            <div className="card-body">
                <h5>
                    <span className="fw-bold">Titolo: </span>
                    <Link className="link" to={`/boardgames/${bg.id}`}>{bg.title}</Link>
                </h5>

                <p><span className="badge_category fw-bold">{bg.category}</span> </p>

                {/* toggle comparazione */}
                <button onClick={() => compareBoardGames(bg)} className="btn-compare me-3 px-2 rounded-2">
                    {isCompared ? "Annulla" : "Confronta"}
                </button>

                {/* toggle preferiti */}
                <button onClick={() => toggleFavorites(bg)} className="btn-favorite px-1 rounded-2">
                    {isFavorite ? <i className="bi bi-heart-fill heart-active"></i> : <i className="bi bi-heart-fill heart-inactive"></i>}
                </button>
            </div>
        </div>
    )
}

// evito re-render se le props non cambiano
export default memo(BoardGamesCard)