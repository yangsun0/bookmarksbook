import * as jwt from "jsonwebtoken";
import GoogleAuth from "./googleAuth";
import TokenPayload from "./TokenPayload";
import User from "./user";

class Auth {
  public async signIn(idToken: string): Promise<string> {
    const googleSignIn = new GoogleAuth();
    const userId = await googleSignIn.signIn(idToken);
    const payload: TokenPayload = {
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
