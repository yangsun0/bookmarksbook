class Config {
  static get baseUrl(): string {
    if (!process.env.REACT_APP_BASE_URL) {
      throw new Error("Missing config: REACT_APP_BASE_URL");
    }

    return process.env.REACT_APP_BASE_URL;
  }

  static get googleSignInButtonId(): string {
    if (!process.env.REACT_APP_GOOGLE_SIGN_IN_BUTTON_ID) {
      throw new Error("Missing config: REACT_APP_GOOGLE_SIGN_IN_BUTTON_ID");
    }

    return process.env.REACT_APP_GOOGLE_SIGN_IN_BUTTON_ID;
  }

  static get googleApiClientId(): string {
    if (!process.env.REACT_APP_GAPI_CLIENT_ID) {
      throw new Error("Missing config: REACT_APP_GAPI_CLIENT_ID");
    }

    return process.env.REACT_APP_GAPI_CLIENT_ID;
  }

  static get googleApiCheckInterval(): number {
    if (!process.env.REACT_APP_GAPI_CHECK_INTERVAL) {
      throw new Error("Missing config: REACT_APP_GAPI_CHECK_INTERVAL");
    }

    return parseInt(process.env.REACT_APP_GAPI_CHECK_INTERVAL);
  }

  static get googleApiCheckTimeout(): number {
    if (!process.env.REACT_APP_GAPI_CHECK_TIMEOUT) {
      throw new Error("Missing config: REACT_APP_GAPI_CHECK_TIMEOUT");
    }

    return parseInt(process.env.REACT_APP_GAPI_CHECK_TIMEOUT);
  }
}

export default Config;
