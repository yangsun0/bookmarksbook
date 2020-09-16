import Config from "../Config";
import User from "./Data/User";

type BasicProfile = {
  getId: () => string,
  getName: () => string,
  getEmail: () => string,
  getImageUrl: () => string,
};

type GoogleUser = {
  getBasicProfile: () => BasicProfile,
};

type RenderOption = {
  longtitle?: boolean,
  onsuccess?: Function,
  onfailure?: Function,
};

class GoogleSignInService {
  clientId: string = "";
  buttonId: string = "";

  constructor() {
    this.clientId = Config.googleApiClientId;
    this.buttonId = Config.googleSignInButtonId;
  }

  async init() {
    await this._checkApiAvailable();
    await this._load();
    await window.gapi.auth2.init({
      client_id: this.clientId,
    });
  }

  async _checkApiAvailable() {
    let time = 0;
    const interval = Config.googleApiCheckInterval;
    const timeout = Config.googleApiCheckTimeout;
    while (!window.gapi) {
      await this._delay(interval);
      time += interval;
      if (time > timeout) {
        throw new Error("GoogleSignInService._checkApiAvailable timeout");
      }
    }
  }

  _delay(millionSeconds: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, millionSeconds));
  }

  _load(): Promise<any> {
    return new Promise((resolve) => {
      window.gapi.load("auth2", resolve);
    });
  }

  isSignedIn(): boolean {
    const instance = window.gapi.auth2.getAuthInstance();
    return instance.isSignedIn.get();
  }

  signIn(): Promise<User> {
    return new Promise((resolve) => {
      const handleSuccess = (googleUser: GoogleUser) => {
        const user = this._createUser(googleUser);
        resolve(user);
      };

      const options: RenderOption = {
        longtitle: true,
        onsuccess: handleSuccess,
      };
      window.gapi.signin2.render(this.buttonId, options);
    });
  }

  getUser(): User {
    const instance = window.gapi.auth2.getAuthInstance();
    const googleUser = instance.currentUser.get();
    return this._createUser(googleUser);
  }

  getIdToken(): string {
    const instance = window.gapi.auth2.getAuthInstance();
    const googleUser = instance.currentUser.get();
    const authResponse = googleUser.getAuthResponse();
    return authResponse.id_token;
  }

  async signOut() {
    const instance = window.gapi.auth2.getAuthInstance();
    await instance.signOut();
  }

  _createUser(googleUser: GoogleUser): User {
    const profile = googleUser.getBasicProfile();
    const user = new User();
    user.id = profile.getId();
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.imageUrl = profile.getImageUrl();
    return user;
  }
}

export default GoogleSignInService;
