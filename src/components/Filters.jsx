import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

export default function Filters() {

    const {
        search,
        setSearch,
        category,
        setCategory,
        sortOrder,
        setSortOrder,
        filterReset
    } = useContext(GlobalContext)

    return (
        <>
            <button className="btn-collapse rounded-2 d-flex mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                Filtra giochi da tavolo
                <i className="bi bi-sort-down ms-1"></i>
            </button>


            <div className="collapse collapse-horizontal" id="collapseWidthExample">
                <div className="card_collapse">
                    <div className="filters">
                        <section>
                            <label>Cerca giochi da tavolo</label>
                            <input
                                type="text"
                                placeholder="Cerca..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </section>

                        <section>
                            <label>Filtra per categioria</label>
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
                        </section>

                        <section>
                            <label>Ordina per titolo</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="ordina">Ordina</option>
                                <option value="titolo A-Z">A-Z</option>
                                <option value="titolo Z-A">Z-A</option>
                            </select>
                        </section>

                        <section>
                            <label>Ordina per categoria</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="ordina">Ordina</option>
                                <option value="categoria A-Z">A-Z</option>
                                <option value="categoria Z-A">Z-A</option>
                            </select>
                        </section>

                        <button className="btn-reset_filter rounded-2 px-2" onClick={filterReset}>Reset filtri</button>
                    </div>
                </div>
            </div>
        </>
    )
}