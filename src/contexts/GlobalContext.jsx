import { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
// console.log("API URL", API_URL,);

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [boardGames, setBoardGames] = useState([])

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


    return (
        <GlobalContext.Provider value={{ boardGames }}>
            {children}
        </GlobalContext.Provider>
    )
}