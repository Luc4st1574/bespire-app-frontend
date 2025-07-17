// utils/fetchLinkMetadata.ts
import axios from "axios";

export async function fetchLinkMetadata(url: string) {
  try {
    const { data } = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    if (data.status === "success") {
      return {
        title: data.data.title,
        favicon: data.data.logo || data.data.image?.url || `${new URL(url).origin}/favicon.ico`,
        description: data.data.description,
        url: data.data.url,
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}
