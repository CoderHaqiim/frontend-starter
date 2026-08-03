import { stringToNumber } from "./numberStringCheck"

export const scoreHealthMap = (score:number | string): string => {
  let health
  let newScore = stringToNumber(score)
  if(newScore < 50 ){
    health = "critical"
  }else if(newScore < 75){
    health = "moderate"
  }else{
    health = "healthy"
  }

  return health
}