import axios from "axios";
import type { AppData } from "../Common/Types";

async function getAppData(): Promise<AppData> {
  const result = await axios.get("http://localhost:3000/data");
  return result.data;
}

export { getAppData };
