import { OAuth2Client } from "google-auth-library";
import config from "../config";

class GoogleAuth {
  private readonly client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(config().googleApiClientId);
  }

  public async authenticate(idToken: string): Promise<string> {
    const ticket = await this.client.verifyIdToken({
      idToken: idToken,
      audience: config().googleApiClientId,
    });
    const userId = ticket.getUserId();
    if (!userId) {
      throw new Error("User id is not available in login ticket.");
    }

    return userId;
  }
}

export default GoogleAuth;
