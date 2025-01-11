import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi tải danh sách liên kết");
  }

  return data;
}

export async function deleteUrl(id) {
  let { data, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi xóa liên kết");
  }

  return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    throw new Error(storageError.message || 'Đã xảy ra lỗi khi tải ảnh lên.');
  }
  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`

  let { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    if (error.code === "23505") {
      throw new Error("Tiêu đề đã được đặt. Vui lòng tạo tiêu đề khác.");
    }
    throw new Error("Có lỗi khi tạo liên kết");
  }

  return data;
}

export async function getLongUrl(param) {
  let { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${param},custom_url.eq.${param}`)
    .single();
  // console.log("Short link data:", shortLinkData);

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
}

export async function getUrl({ id, user_id }) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error getting short link:", error);
    return;
  }

  return data;
}