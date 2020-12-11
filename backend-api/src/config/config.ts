import {
  EmptyStringError,
  NotIntegerError,
  UndefinedError,
} from "./configError";

class Config {
  public readonly port: number;
  public readonly rateLimitMax: number;
  public readonly googleApiClientId: string;
  public readonly nodeEnv: string;
  public readonly httpLogFormat: string;
  public readonly authPrivateKeyPath: string;
  public readonly authPublicKeyPath: string;

  constructor() {
    this.port = this.getEnvInteger("PORT");
    this.rateLimitMax = this.getEnvInteger("RATE_LIMIT_MAX_PER_MINUTE");
    this.googleApiClientId = this.getEnv("GOOGLE_API_CLIENT_ID");
    this.nodeEnv = this.getEnv("NODE_ENV");
    this.authPrivateKeyPath = this.getEnv("AUTH_PRIVATE_KEY_FILE");
    this.authPublicKeyPath = this.getEnv("AUTH_PUBLIC_KEY_FILE");
    this.httpLogFormat = "combined";
    if (this.nodeEnv === "dev") {
      this.httpLogFormat = "dev";
    }
  }

  private getEnv(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new UndefinedError(key);
    } else if (value === "") {
      throw new EmptyStringError(key);
    }

    return value;
  }

  private getEnvInteger(key: string): number {
    const value = process.env[key];
    if (value === undefined) {
      throw new UndefinedError(key);
    }

    const integer = parseInt(value);
    if (isNaN(integer)) {
      throw new NotIntegerError(key);
    }

    return integer;
  }
}

export default Config;
