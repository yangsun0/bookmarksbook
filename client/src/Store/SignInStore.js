import { action, observable, runInAction } from "mobx";
import Config from "../Config";
import User from "../Service/Data/User";
import SignInService from "../Service/SignInService";
import AppStore from "./AppStore";

class SignInStore {
  appStore: AppStore;
  signInService: SignInService = new SignInService();
  googleButtonId: string = "";
  idToken: string = "";

  @observable isShown: boolean = false;
  @observable isSignedIn: boolean = false;
  @observable id: string = "";
  @observable name: string = "";
  @observable email: string = "";
  @observable imageUrl: string = "";

  constructor() {
    this.googleButtonId = Config.googleSignInButtonId;
  }

  @action async authenticate() {
    await this.signInService.init();
    if (this.signInService.isSignedIn()) {
      const user = this.signInService.getUser();
      this.setUser(user);
      this._serviceSignIn();
    }
    this.appStore.fetchData();
  }

  @action open() {
    this.isShown = true;
  }

  @action close() {
    this.isShown = false;
  }

  @action async signIn() {
    const user = await this.signInService.signIn();
    this.setUser(user);
    this.close();
    this._serviceSignIn();
    this.appStore.fetchData();
  }

  @action async signOut() {
    await this.signInService.signOut();
    runInAction(() => {
      this.id = "";
      this.name = "";
      this.email = "";
      this.imageUrl = "";
      this.isSignedIn = false;
    });
    this.appStore.bookmarkService.signOut();
  }

  @action setUser(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.isSignedIn = true;
  }

  _serviceSignIn() {
    const idToken = this.signInService.getIdToken();
    this.appStore.bookmarkService.signIn(idToken);
  }
}

export default SignInStore;
