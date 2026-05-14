import React from "react"

export function inputHandler<T>(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<T>>
) {
    const { name, value } = e.currentTarget

    setState((prev) => ({
        ...prev,
        [name]: value
    }))
}