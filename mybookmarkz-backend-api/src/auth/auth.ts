import * as jwt from "jsonwebtoken";
import GoogleAuth from "./googleAuth";
import User from "./user";

interface TokenPayload {
  sub: string;
}

class Auth {
  public static get cookieName(): string {
    return "access_token";
  }

  public async signIn(idToken: string): Promise<string> {
    const googleSignIn = new GoogleAuth();
    const userId = await googleSignIn.signIn(idToken);
    const payload = {
      sub: userId,
    };
    const accessToken = jwt.sign(payload, "private_key", {
      expiresIn: "1h",
    });
    return accessToken;
  }

  public authorize(accessToken: string): User {
    const payload = jwt.verify(accessToken, "private_key") as TokenPayload;
    const user = new User(payload.sub);
    return user;
  }
}

export default Auth;
