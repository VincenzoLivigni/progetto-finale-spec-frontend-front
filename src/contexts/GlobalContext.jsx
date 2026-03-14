import { createContext, useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
// console.log("API URL", API_URL,);

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [boardGames, setBoardGames] = useState([])

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("seleziona")
    const [sortOrder, setSortOrder] = useState("ordina")

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

    return (
        <GlobalContext.Provider value={{ boardGames, filteredBoardGames, search, setSearch, category, setCategory, sortOrder, setSortOrder }}>
            {children}
        </GlobalContext.Provider>
    )
}