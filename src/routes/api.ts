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
