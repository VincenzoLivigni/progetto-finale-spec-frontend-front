import { useCallback, useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"


function debounce(callback, delay) {
    let timer;

    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

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

    const debounceSetSearch = useCallback(
        debounce(setSearch, 500)
        , [])

    return (
        <>
            <button className="btn-collapse rounded-2 d-flex mb-3 mt-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                Filtra giochi
                <i className="bi bi-filter ms-1"></i>
            </button>


            <div className="collapse" id="collapseWidthExample">
                <div className="card_collapse">
                    <div className="filters_card">


                        <div className="filters">
                            <div className="row g-3">
                                <section className="col-6 col-lg-3">
                                    <span>Cerca giochi da tavolo</span>
                                    <input
                                        type="text"
                                        placeholder="Cerca..."
                                        onChange={(e) => debounceSetSearch(e.target.value)}
                                    />
                                </section>

                                <section className="col-6 col-lg-3">
                                    <span>Filtra per categioria</span>
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

                                <section className="col-6 col-lg-3">
                                    <span>Ordina per titolo</span>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}>
                                        <option value="ordina">Ordina</option>
                                        <option value="titolo A-Z">A-Z</option>
                                        <option value="titolo Z-A">Z-A</option>
                                    </select>
                                </section>

                                <section className="col-6 col-lg-3">
                                    <span>Ordina per categoria</span>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}>
                                        <option value="ordina">Ordina</option>
                                        <option value="categoria A-Z">A-Z</option>
                                        <option value="categoria Z-A">Z-A</option>
                                    </select>
                                </section>
                            </div>
                        </div>

                        <div>
                            <button className="btn-reset_filter rounded-2 px-2 mt-4" onClick={filterReset}>Reset filtri</button>
                        </div>

                    </div>
                </div >
            </div >
        </>
    )
}