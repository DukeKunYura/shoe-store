/**
 * Отправка fetch запросов
 */
export default async function sendRequest(url) {
    return await fetch(url).then((res) => res.json())
};