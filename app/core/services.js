import axios from "axios";
import { URLS } from "./urls";

export async function auth(credentials) {
  try {
    return await axios.post(URLS.auth, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return error;
  }
}