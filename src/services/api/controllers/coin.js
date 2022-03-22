const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');
const { getCoinPrice } = require('../utils/coingecko');
const ONE_HOUR = 60 * 60 * 1000;

const CoinController = {
  async getCoinByCode(coinCode) {
    let coin = await Models.Coin.findByCoinCode(coinCode);

    errors.assertExposable(coin, 'unknown_coin_code');

    if (!coin.price || new Date() - new Date(coin.updateAt) > ONE_HOUR) {
      const price = await getCoinPrice(coinCode.toLowerCase());
      coin = await Models.Coin.updateCoinByCode(coinCode, { price: price.toString() });
    }

    return coin.filterKeys(['name', 'code', 'price']);
  },

  async createCoin(data) {
    const coin = await Models.Coin.findByCoinCode(data.code);

    if (coin) errors.throwExposable('coin_code_exists', 400, 'code code already exist');

    const newCoin = await Models.Coin.createCoin(data);

    return newCoin.filterKeys();
  },
};

module.exports = CoinController;
