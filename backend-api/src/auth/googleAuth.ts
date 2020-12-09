import { OAuth2Client } from "google-auth-library";
import Config from "../config/config";

class GoogleAuth {
  private readonly config: Config;
  private readonly client: OAuth2Client;

  constructor() {
    this.config = new Config();
    this.client = new OAuth2Client(this.config.googleApiClientId);
  }

  public async authenticate(idToken: string): Promise<string> {
    const ticket = await this.client.verifyIdToken({
      idToken: idToken,
      audience: this.config.googleApiClientId,
    });
    const userId = ticket.getUserId();
    if (!userId) {
      throw new Error("User id is not available in login ticket.");
    }

    return userId;
  }
}

export default GoogleAuth;
