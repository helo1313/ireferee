import { availableCoins } from "../constants/coins";

const getCoinsData = async () => {
  const promises = availableCoins.map((coin) => {
    return fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
  });

  const responses = await Promise.all(promises);

  const filteredResponses = responses.filter((response) => {
    return response.ok;
  });

  const jsonPromises = filteredResponses.map((response) => {
    return response.json();
  });

  let data = await Promise.all(jsonPromises);

  return data;
};

export default getCoinsData;
