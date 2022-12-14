import { apiInstance } from ".";

const userAPI = apiInstance();

// 아이디 중복 체크
export async function duplicateId(userId, Toast, setCheckId) {
  if (!userId) {
    Toast.fire({
      icon: "question",
      title: "아이디를 입력하세요.",
      timer: 1000,
      position: 'center',
    });
    return
  };
  try {
    console.log(userId)
    const res = await userAPI.get('admin/validUserId', {params : {userId: userId}});
    console.log(res)
    setCheckId(true);
    Toast.fire({
      icon: "success",
      title: "사용 가능한 아이디입니다.",
      timer: 1000,
      position: 'center',
    })
  } 
  catch (error) {
    if (error.response.status===409) {
      Toast.fire({
        icon: "error",
        title: "이미 존재하는 아이디입니다.",
        timer: 1000,
        position: 'top-center',
      });
    }
    }
  };


