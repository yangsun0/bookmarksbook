class CookieError extends Error {
  public readonly key: string;

  constructor(key: string) {
    const message = `Cookie ${key} is undefined`;
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.key = key;
  }
}

export default CookieError;
