const configs = {
  development: {
    web: {
      HOST: "http://localhost:3000",
    },
    api: {
      HOST: "http://localhost:3001",
    },
    env: "dev",
  },
};

const configEnv = configs[process.env.REACT_APP_STAGE] || configs.development;

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  BASE_PATH: "src/",
  PLACEHOLDER_IMAGE: "../images/products/placeholder.webp",
  ...configEnv,
};

export default config;
