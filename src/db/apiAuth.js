import supabase, {supabaseUrl} from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    let errorMessage = '';
    switch (error.code) {
      case 'invalid_credentials':
        errorMessage = 'Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại email và mật khẩu.';
        break;
      case 'email_not_confirmed':
        errorMessage = 'Email chưa được xác thực. Vui lòng kiểm tra hộp thư của bạn để xác nhận.';
        break;
      case 'user_not_found':
        errorMessage = 'Không tìm thấy người dùng với email này.';
        break;
      case 'user_banned':
        errorMessage = 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên.';
        break;
      default:
        errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
    }

    throw new Error(errorMessage);
  }
  return data;
}


export async function signup({ name, email, password, profile_pic }) {
  if (!profile_pic) {
    throw new Error('Vui lòng chọn ảnh đại diện.');
  }

  // const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  // if (!allowedImageTypes.includes(profile_pic.type)) {
  //   throw new Error('Ảnh đại diện phải là JPEG, PNG hoặc GIF.');
  // }

  const fileName = `avt-${email.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) {
    throw new Error(storageError.message || 'Đã xảy ra lỗi khi tải ảnh lên.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) {
    let errorMessage = '';
    switch (error.code) {
      case 'email_exists':
        errorMessage = 'Email này đã được đăng ký. Vui lòng thử email khác.';
        break;
      case 'weak_password':
        errorMessage = 'Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.';
        break;
      case 'validation_failed':
        errorMessage = 'Thông tin bạn nhập không hợp lệ. Vui lòng kiểm tra lại.';
        break;
      default:
        errorMessage = error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
    }
    throw new Error(errorMessage);
  }

  return data;
}


export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  // const {data, error} = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}