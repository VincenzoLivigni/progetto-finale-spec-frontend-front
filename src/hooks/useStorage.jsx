import { useState, useEffect } from "react";

export default function useStorage(itemKey, initialValue) {

    const [value, setValue] = useState(() => {

        // salvo il valore selezionato
        const savedValue = localStorage.getItem(itemKey)

        // ritorno il valore salvato o initialValue 
        return savedValue ? JSON.parse(savedValue) : initialValue
    })

    useEffect(() => {
        // aggiorno lo storage ad ogni cambiamento del valore
        localStorage.setItem(itemKey, JSON.stringify(value))
    }, [itemKey, value])

    return [value, setValue]
}
