export const stringToNumber = (value: string | number) => {
    const convertedScore = Number(value)
    const numScore = Number.isFinite(convertedScore) ? convertedScore : 0
    return numScore
}