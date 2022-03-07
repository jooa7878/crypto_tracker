export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((resp) =>
    resp.json()
  );
}

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((resp) => resp.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((resp) => resp.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((resp) => resp.json());
}
