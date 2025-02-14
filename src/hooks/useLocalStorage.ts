import { DIFFICULTS } from "@/model/enums";

const localStorageKeys = {
  difficults: 'difficult',
  boardGame: 'boardGame'
}

export function useLocalStorage() {
  function getDifficultChosen(): DIFFICULTS {
    const data = localStorage.getItem(localStorageKeys.difficults);
    return data === null ? DIFFICULTS.NORMAL : JSON.parse(data);
  }

  function setDifficultChosen(difficult: DIFFICULTS) {
    localStorage.setItem(localStorageKeys.difficults,JSON.stringify(difficult))
  }

  return { getDifficultChosen, setDifficultChosen}
}