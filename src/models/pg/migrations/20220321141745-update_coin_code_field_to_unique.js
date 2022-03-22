module.exports = {
  up: async function (query, transaction) {
    const sql = `ALTER TABLE "Coin" ADD UNIQUE ("code")`;

    await transaction.sequelize.query(sql);
  },

  down: async function (query, transaction) {
    const sql = `ALTER TABLE "Coin" DROP CONSTRAINT "Coin_code_key"`;

    await transaction.sequelize.query(sql);
  },
};
