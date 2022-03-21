const path = require('path');
const sinon = require('sinon');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const CoinController = require(path.join(srcDir, '/services/api/controllers/coin'));
const DB = require(path.join(srcDir, 'modules/db'));

describe('Controller: Coin', () => {
  let sandbox = null;

  sequelizeMockingMocha(DB.sequelize, [path.resolve('test/mocks/coins.json')], { logging: false });

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('getCoinByCode', () => {
    it('should get coin by code', async () => {
      const coinCode = 'BTC';
      const coin = await CoinController.getCoinByCode(coinCode);

      expect(coin.code).to.eq(coinCode);
      expect(Object.keys(coin).length).to.eq(3);
    });

    it('should fail get coin by code', async () => {
      const coinCode = 'AMN';
      expect(CoinController.getCoinByCode(coinCode)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });

  describe('createCoin', () => {
    it('should to create coin', async () => {
      const coinCode = 'DEV';

      const coin = await CoinController.createCoin({ code: coinCode, name: 'devrum' });

      expect(coin.code).to.eq(coinCode);
      expect(Object.keys(coin).length).to.eq(3);
    });

    it('should fail to create coin if coin code exist', async () => {
      const coinCode = 'DEV';

      const coin = await CoinController.createCoin({ code: coinCode, name: 'devrum' });

      expect(coin.code).to.eq(coinCode);
      expect(Object.keys(coin).length).to.eq(3);

      expect(CoinController.createCoin({ code: coinCode, name: 'new' })).to.be.rejectedWith(Error, 'coin_code_exists');
    });
  });
});
