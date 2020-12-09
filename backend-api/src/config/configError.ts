class ConfigError extends Error {
  public readonly key: string;

  constructor(key: string, error: string) {
    const message = `"${key}" ${error}`;
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ConfigError.name;
    this.key = key;
  }
}

class UndefinedError extends ConfigError {
  constructor(key: string) {
    super(key, "is undefined.");
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UndefinedError.name;
  }
}

class EmptyStringError extends ConfigError {
  constructor(key: string) {
    super(key, "is empty string.");
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = EmptyStringError.name;
  }
}

class NotIntegerError extends ConfigError {
  constructor(key: string) {
    super(key, "is not a valid integer.");
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = NotIntegerError.name;
  }
}

export { UndefinedError, EmptyStringError, NotIntegerError };
