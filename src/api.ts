import axios from "axios";

export function coinFetchData() {
  return axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
}

export function coinInfoFetchData(coinId: string) {
  return axios
    .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    .then((res) => res.data);
}

export function priceInfoFetchData(coinId: string) {
  return axios
    .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((res) => res.data);
}

export function ohlcvInfoFetchData(coinId: string) {
  return axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
}
