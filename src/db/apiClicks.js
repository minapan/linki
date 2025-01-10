import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicks(url_id) {
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi tải lượt mở");
  }
  return data;
}

const parser = new UAParser();

export async function storeClicks({ id, originalUrl }) {
  try {
    const resUA = parser.getResult();
    const device = resUA.os.name || "Unknown device";
    const browser = resUA.browser.name || "Unknown browser";

    const apiKey = import.meta.env.VITE_IPINFO_API_KEY;
    const geoRes = await fetch(`https://ipinfo.io/json?token=${apiKey}`);
    const geoData = await geoRes.json();
    const city = geoData.city + ", " + geoData.region || "Unknown city";
    const country_name = geoData.country || "Unknown country";

    await supabase
      .from("clicks")
      .insert([
        {
          url_id: id,
          device,
          browser,
          city,
          country: country_name,
        },
      ])
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error storing clicks", error);
  }
}