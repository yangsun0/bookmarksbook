import Auth from "./auth";
import User from "./user";

let auth: Auth | undefined;

function getAuth(): Auth {
  if (!auth) {
    auth = new Auth();
  }

  return auth;
}

export default getAuth;
export { User, Auth };
