import axios from "axios";
import type { $AxiosXHR } from "axios";
import type { AppData } from "../Common/Types";

async function getAppData(): Promise<AppData> {
  const query: Promise<$AxiosXHR<AppData>> = axios(
    "http://localhost:3000/data"
  );
  const result = await query;
  return result.data;
}

export { getAppData };
