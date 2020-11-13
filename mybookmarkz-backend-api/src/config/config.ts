import {
  EmptyStringError,
  NotIntegerError,
  UndefinedError,
} from "./configError";

class Config {
  public get port(): number {
    return this.getEnvInteger("PORT");
  }

  public get googleApiClientId(): string {
    return this.getEnv("GOOGLE_API_CLIENT_ID");
  }

  public get httpLogFormat(): string {
    if (this.NodeEnv === "dev") {
      return "dev";
    } else {
      return "combined";
    }
  }

  public get NodeEnv(): string {
    return this.getEnv("NODE_ENV");
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
