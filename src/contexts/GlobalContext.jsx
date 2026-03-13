import { createContext, useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
// console.log("API URL", API_URL,);

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [boardGames, setBoardGames] = useState([])

    const [search, setSearch] = useState("")

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
        return boardGames.filter((bg) => bg.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, boardGames])


    return (
        <GlobalContext.Provider value={{ boardGames, filteredBoardGames, search, setSearch }}>
            {children}
        </GlobalContext.Provider>
    )
}