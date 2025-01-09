import supabase from "./supabase";

export async function getClicks(url_id) {
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi tải lượt mở");
  }
  return data;
}