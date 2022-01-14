const configs = {
  development: {
    corsOrigins: [
      'http://localhost:3000',
      'http://localhost:4000',
      'localhost:3000',
      'localhost:4000',
    ],
    currentEnv: 'http://localhost:3000',
  },
};

const configVariables = configs[process.env.NODE_ENV] || configs.development;

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  NODE_PATH: 'src/',
  ...configVariables,
};

module.exports = config;
