const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');

const CoinController = {
  async getCoinByCode(coinCode) {
    const coin = await Models.Coin.findByCoinCode(coinCode);

    errors.assertExposable(coin, 'unknown_coin_code');

    return coin.filterKeys();
  },

  async createCoin(data) {
    const coin = await Models.Coin.findByCoinCode(data.code);

    if (coin) errors.throwExposable('coin_code_exists', 400, 'code code already exist');

    const newCoin = await Models.Coin.createCoin(data);

    return newCoin.filterKeys();
  },
};

module.exports = CoinController;
