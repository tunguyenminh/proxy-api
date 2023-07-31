export default () => ({
  port: parseInt(process.env.PORT, 10) || 8686,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    salt: 12,
  },
  voip: {
    key: process.env.VOIP_KEY,
    secret: process.env.VOIP_SECRET,
  },
  whitelistOrigins: [],
  defaultPassword: 'email@123',
  commonSortFields: ['createdAt', 'updatedAt'],
  webhookSecret: process.env.WEBHOOK_SECRET,
});