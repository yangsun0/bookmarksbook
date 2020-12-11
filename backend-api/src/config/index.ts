import Config from "./config";

let config: Config | undefined;

function getConfig(): Config {
  if (!config) {
    config = new Config();
  }

  return config;
}

function reloadConfig(): void {
  config = undefined;
}

export default getConfig;
export { Config, reloadConfig };
