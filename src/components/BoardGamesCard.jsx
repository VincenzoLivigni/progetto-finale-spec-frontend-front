import { Link } from "react-router-dom";

export default function BoardGamesCard({ bg, compareBoardGames, isCompared, toggleFavorites, isFavorite }) {

    return (
        <div className="card_list mb-4 p-4 rounded-2">
            <div className="card-body">
                <Link className="link" to={`/boardgames/${bg.id}`}>
                    <h5 className="card_title"><span className="fw-bold">Titolo:</span> {bg.title}</h5>
                </Link>
                <p><span className="badge_category fw-bold">{bg.category}</span> </p>

                <button onClick={() => compareBoardGames(bg)} className="btn-compare me-3 px-2 rounded-2">
                    {isCompared ? "Annulla" : "Confronta"}
                </button>

                <button onClick={() => toggleFavorites(bg)} className="btn-favorite px-1 rounded-2">
                    {isFavorite ? <i className="bi bi-heart-fill heart-active"></i> : <i className="bi bi-heart-fill heart-inactive"></i>}
                </button>
            </div>
        </div>
    )
}