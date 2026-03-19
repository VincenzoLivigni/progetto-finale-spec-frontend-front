import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import useStorage from "../hooks/useStorage";

const API_URL = import.meta.env.VITE_API_URL;

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [boardGames, setBoardGames] = useState([])

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("seleziona")
    const [sortOrder, setSortOrder] = useState("ordina")

    const [compareGames, setCompareGames] = useState([])

    const [favorites, setFavorites] = useStorage("favorites", [])

    const [error, setError] = useState(false)

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

    // filtraggio per nome, per categoria e ordinamento
    const filteredBoardGames = useMemo(() => {
        let filteredGames = boardGames.filter((bg) =>
            bg.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === "seleziona" || bg.category === category)
        )

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

    const filterReset = useCallback(() => {
        setSearch("")
        setCategory("seleziona")
        setSortOrder("ordina")
    }, [setSearch, setCategory, setSortOrder])

    // comparazione
    const compareBoardGames = useCallback(async (bg) => {
        try {
            const res = await fetch(`${API_URL}/products/${bg.id}`)

            if (!res.ok) {
                throw new Error(`Errore: ${res.status}`)
            }

            const data = await res.json()

            const selectedGame = data.product

            setCompareGames(currentGames => {
                const isSelected = currentGames.some((g) => g.id === selectedGame.id)

                if (isSelected) {
                    return currentGames.filter((g) => g.id !== selectedGame.id)
                }

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

    const clearCompare = useCallback(() => {
        setCompareGames([])
    }, [setCompareGames])

    // preferiti 
    const toggleFavorites = useCallback((boardgame) => {
        setFavorites(currentFavorites => {

            const isInFavorite = currentFavorites.some((bg) => bg.id === boardgame.id)

            if (isInFavorite) {
                return currentFavorites.filter((bg) => bg.id !== boardgame.id)
            }
            return [...currentFavorites, boardgame]
        })
    }, [setFavorites])

    const clearFavorites = useCallback(() => {
        setFavorites([])
    }, [setFavorites])

    return (
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