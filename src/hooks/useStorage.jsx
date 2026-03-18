import { useState, useEffect } from "react";

export default function useStorage(itemKey, initialValue) {

    const [value, setValue] = useState(() => {

        const savedValue = localStorage.getItem(itemKey)
        return savedValue ? JSON.parse(savedValue) : initialValue
    })

    useEffect(() => {

        localStorage.setItem(itemKey, JSON.stringify(value))
    }, [itemKey, value])

    return [value, setValue]
}
