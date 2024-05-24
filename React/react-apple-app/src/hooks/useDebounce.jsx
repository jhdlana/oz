import { useEffect, useState } from "react"

 export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(debounceValue)
        }, delay)
        
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue
 }