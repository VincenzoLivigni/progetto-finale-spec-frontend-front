import { createContext, useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
// console.log("API URL", API_URL,);

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [boardGames, setBoardGames] = useState([])

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("seleziona")
    const [sortOrder, setSortOrder] = useState("ordina")

    const [compareGames, setCompareGames] = useState([])

    const [favorites, setFavorites] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()
            // console.log("Dati ricevuti con successo", data);
            setBoardGames(data)
        }
        catch (err) {
            console.log("Errore nella ricezione dei dati", err);
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

        if (sortOrder === "A-Z") {
            filteredGames = [...filteredGames].sort((a, z) => a.title.localeCompare(z.title))
        } else if (sortOrder === "Z-A") {
            filteredGames = [...filteredGames].sort((a, z) => z.title.localeCompare(a.title))
        } else { sortOrder }

        return filteredGames

    }, [search, boardGames, category, sortOrder])


    // comparazione
    async function compareBoardGames(boardgame) {
        try {
            const res = await fetch(`${API_URL}/products/${boardgame.id}`)
            const data = await res.json()
            // console.log(data.product);

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
        }
    }

    function clearCompare() {
        setCompareGames([])
    }


    // preferiti 
    function toggleFavorites(boardgame) {
        setFavorites(currentFavorites => {

            const isInFavorite = currentFavorites.some((bg) => bg.id === boardgame.id)

            if (isInFavorite) {
                return currentFavorites.filter((bg) => bg.id !== boardgame.id)
            }
            return [...currentFavorites, boardgame]
        })
    }

    function clearFavorites() {
        setFavorites([])
    }

    return (
        <GlobalContext.Provider value={{ boardGames, filteredBoardGames, search, setSearch, category, setCategory, sortOrder, setSortOrder, compareGames, compareBoardGames, clearCompare, favorites, toggleFavorites, clearFavorites }}>
            {children}
        </GlobalContext.Provider>
    )
}