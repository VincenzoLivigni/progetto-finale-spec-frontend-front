import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import useStorage from "../hooks/useStorage";

const API_URL = import.meta.env.VITE_API_URL;

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    // stati 
    const [boardGames, setBoardGames] = useState([])

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("seleziona")
    const [sortOrder, setSortOrder] = useState("ordina")

    const [compareGames, setCompareGames] = useState([])

    const [favorites, setFavorites] = useStorage("favorites", [])

    const [error, setError] = useState(false)

    // recupero dati dei giochi dall'API 
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`)

            if (!res.ok) {
                throw new Error(`Errore: ${res.status}`)
            }

            const data = await res.json()
            setBoardGames(data)
        }
        catch (err) {
            console.log("Errore nella ricezione dei dati", err);
            setError(true)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    // getione filtraggio

    // con useMemo memorizzo i risultati dei filtraggi evitando ricalcoli inutili
    const filteredBoardGames = useMemo(() => {
        let filteredGames = boardGames.filter((bg) =>
            // filtraggio per nome
            bg.title.toLowerCase().includes(search.toLowerCase()) &&
            // filtraggio per categoria
            (category === "seleziona" || bg.category === category)
        )

        // ordinamento
        if (sortOrder === "titolo A-Z") {
            filteredGames = [...filteredGames].sort((a, z) => a.title.localeCompare(z.title))
        } else if (sortOrder === "titolo Z-A") {
            filteredGames = [...filteredGames].sort((a, z) => z.title.localeCompare(a.title))
        } else if (sortOrder === "categoria A-Z") {
            filteredGames = [...filteredGames].sort((a, z) => a.category.localeCompare(z.category))
        } else if (sortOrder === "categoria Z-A") {
            filteredGames = [...filteredGames].sort((a, z) => z.category.localeCompare(a.category))
        }

        return filteredGames

    }, [search, boardGames, category, sortOrder])


    // reset dei filtri

    // con useCallback memorizzo la funzione per evitare che venga ricreata ad ogni render
    const filterReset = useCallback(() => {
        setSearch("")
        setCategory("seleziona")
        setSortOrder("ordina")
    }, [setSearch, setCategory, setSortOrder])


    // gestione comparazione
    const compareBoardGames = useCallback(async (bg) => {
        try {
            const res = await fetch(`${API_URL}/products/${bg.id}`)

            if (!res.ok) {
                throw new Error(`Errore: ${res.status}`)
            }

            const data = await res.json()

            // gioco cliccato con i suoi dettagli
            const selectedGame = data.product

            setCompareGames(currentGames => {
                // se il gioco è già stato selezionato
                const isSelected = currentGames.some((g) => g.id === selectedGame.id)

                // lo rimuovo
                if (isSelected) {
                    return currentGames.filter((g) => g.id !== selectedGame.id)
                }

                // max 2 giochi
                if (currentGames.length === 2) {
                    return currentGames
                }

                return [...currentGames, selectedGame]
            })
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }, [setCompareGames])


    // reset comparazione
    const clearCompare = useCallback(() => {
        setCompareGames([])
    }, [setCompareGames])

    // gestione preferiti 
    const toggleFavorites = useCallback((boardgame) => {
        setFavorites(currentFavorites => {

            // se il gioco è già stato selezionato
            const isInFavorite = currentFavorites.some((bg) => bg.id === boardgame.id)

            // lo rimuovo
            if (isInFavorite) {
                return currentFavorites.filter((bg) => bg.id !== boardgame.id)
            }
            return [...currentFavorites, boardgame]
        })
    }, [setFavorites])


    // reset preferiti
    const clearFavorites = useCallback(() => {
        setFavorites([])
    }, [setFavorites])

    return (
        // rendo disponibili e riutilizzabili dati e funzioni nell'app
        <GlobalContext.Provider value={{
            boardGames,
            filteredBoardGames,
            search,
            setSearch,
            category,
            setCategory,
            sortOrder,
            setSortOrder,
            compareGames,
            compareBoardGames,
            clearCompare,
            favorites,
            toggleFavorites,
            clearFavorites,
            filterReset,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}