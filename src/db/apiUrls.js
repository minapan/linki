import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  let {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi tải danh sách liên kết");
  }

  return data;
}

export async function deleteUrl(id) {
  let {data, error} = await supabase
    .from("urls")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Có lỗi khi xóa liên kết");
  }

  return data;
}

export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  const short_url = Math.random().toString(36).substring(2, 6); 
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    throw new Error(storageError.message || 'Đã xảy ra lỗi khi tải ảnh lên.');
  }
  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`
  
  let {data, error} = await supabase
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