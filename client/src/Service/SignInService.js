import User from "./Data/User";
import GoogleSignInService from "./GoogleSignInService";

class SignInService {
  googleSignInService: GoogleSignInService = new GoogleSignInService();

  async init() {
    await this.googleSignInService.init();
  }

  isSignedIn(): boolean {
    return this.googleSignInService.isSignedIn();
  }

  getUser(): User {
    return this.googleSignInService.getUser();
  }

  getIdToken(): string {
    return this.googleSignInService.getIdToken();
  }

  async signIn(): Promise<User> {
    return this.googleSignInService.signIn();
  }

  async signOut(): Promise<any> {
    return this.googleSignInService.signOut();
  }
}

export default SignInService;
