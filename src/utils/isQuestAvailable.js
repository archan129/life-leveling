export function isQuestAvailable(quest) {
    if (!quest.availableFrom || !quest.availableTo) return true;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [fromH, fromM] = quest.availableFrom.split(":").map(Number);
    const availableFrom = fromH * 60 + fromM;

    const [toH, toM] = quest.availableTo.split(":").map(Number);
    const availableTo = toH * 60 + toM;

    return currentMinutes >= availableFrom && currentMinutes <= availableTo;
}
