export const shortenText = (sentence: string, length: number | string) => {
    const numLength = Number(length)

    if(sentence.length > numLength){
        const newSentence = sentence.slice(0, numLength)
        const shortenedText =   `${newSentence}...` 
        return shortenedText
    }else{
        return sentence
    }
}