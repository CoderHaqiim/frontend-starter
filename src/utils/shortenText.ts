export const shortenText = (sentence: number | string, length: number | string) => {
    const numLength = Number(length)
    const textSentence = String(sentence)
    if(textSentence.length > numLength){
        const newSentence = textSentence.slice(0, numLength)
        const shortenedText =   `${newSentence}...` 
        return shortenedText
    }else{
        return textSentence
    }
}