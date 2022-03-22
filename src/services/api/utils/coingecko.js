const axios = require('axios');
const errors = require('../../../helpers/errors');
const config = require('../../../../config/index');

module.exports = {
  async getCoinPrice(coin) {
    try {
      console.log(config.NODE_ENV, config.ENVIRONMENT);
      if (!['development', 'production'].includes(config.NODE_ENV)) return Math.floor(Math.random() * 100).toFixed(2);

      const { data } = await axios.get(`${config.COIN_GECKO}/${coin}`);

      return data.market_data.current_price.usd;
    } catch (error) {
      errors.throwExposable('error_fetching_coin_price', 400, error.Message);
    }
  },
};