module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('URL', 'http://localhost:1337'),
  proxy: true,
  logger: {
    level: env('LOG_LEVEL', 'info'),
    updates: {
      enabled: env.bool('STRAPI_DISABLE_UPDATE_NOTIFICATION', true),
    },
  },
});
