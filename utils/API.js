import AsyncStorage from "@react-native-async-storage/async-storage";
const FLASHCARDS_KEY = 'flashcards:decks'
export function _addDeck({ deck, key }) {
    AsyncStorage.getItem(FLASHCARDS_KEY).then((items) => {
        if (items === null) {
            return AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify({ [key]: deck }))
        }
        return AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify({ [key]: deck }));
    });
}
export function _removeDeck(key) {
    return AsyncStorage.getItem(FLASHCARDS_KEY).then((res) => {
        const data = JSON.parse(res);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(data));
    })
}
export function _addCard({ card, deckId }) {
    return AsyncStorage.getItem(FLASHCARDS_KEY).then((res) => {
        const data = JSON.parse(res);
        data[deckId] = { ...data[deckId], questions: data[deckId].questions.concat([card]) };
        AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(data));
    })
}
export function _fetchDeckResults() {
    return AsyncStorage.getItem(FLASHCARDS_KEY).then(JSON.parse)
}