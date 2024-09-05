const cron = require('node-cron');
const db = require('../db/index');

const deleteExpiredTokens = async () => {
  try {
    const result = await db.query('DELETE FROM tokens WHERE expires_at < NOW()');
    console.log(`${result.rowCount} expired tokens deleted.`);
  } catch (err) {
    console.error('Error deleting expired tokens:', err);
  }
};

const startTokenCleaner = () => {
  cron.schedule('0 0 * * *', () => {
    console.log('Running cron job: Deleting expired tokens');
    deleteExpiredTokens();
  });
};

module.exports = startTokenCleaner;
