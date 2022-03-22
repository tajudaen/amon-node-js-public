const Joi = require('joi');
const Router = require('@koa/router');
const CoinController = require('../controllers/coin');
const { validateParams } = require('../../../helpers/validation');

const CoinRouter = {
  schemaGetByCoinCode: Joi.object({
    coinCode: Joi.string().min(3).uppercase().max(5),
  }),
  // TODO - relocation of the validation schema as code base evolves
  schemaCreateCoin: Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required().min(3).uppercase().max(5),
  }),

  async getCoinByCode(ctx) {
    const params = {
      coinCode: ctx.params.coinCode,
    };

    const formattedParams = await validateParams(CoinRouter.schemaGetByCoinCode, params);

    ctx.body = await CoinController.getCoinByCode(formattedParams.coinCode);
  },
  async createNewCoin(ctx) {
    const params = {
      name: ctx.request.body.name,
      code: ctx.request.body.code,
    };

    const formattedParams = await validateParams(CoinRouter.schemaCreateCoin, params);

    ctx.response.body = await CoinController.createCoin(formattedParams);
  },

  router() {
    const router = Router();

    /**
     * @api {get} / Get coinCode
     * @apiName coinCode
     * @apiGroup Status
     * @apiDescription Get coinCode
     *
     * @apiSampleRequest /
     *
     */
    router.get('/:coinCode', CoinRouter.getCoinByCode);
    // I feel post(HTTP method) rather than put though

    router.put('/createCoin', CoinRouter.createNewCoin);

    return router;
  },
};

module.exports = CoinRouter;
