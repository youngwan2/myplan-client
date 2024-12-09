// 유효성 체크 => 필요에 따라 확장 가능
export const validators = {
  username: (value: string) => {
    if (!value) return '사용자 이름을 입력해주세요';
    if (value.length < 2) return '사용자 이름은 최소 2자 이상이어야 합니다';
    return null;
  },
  email: (value: string) => {
    if (!value) return '이메일을 입력해주세요';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '유효한 이메일 형식이 아닙니다';
    return null;
  },
  password: (value: string) => {
    if (!value) return '비밀번호를 입력해주세요';
    if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다';
    if (!/[A-Z]/.test(value)) return '대문자를 포함해야 합니다';
    if (!/[0-9]/.test(value)) return '숫자를 포함해야 합니다';
    return null;
  },
  confirmPassword: (password: string, confirmPassword: string) => {
    if (!confirmPassword) return '비밀번호 확인을 입력해주세요';
    if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다';
    return null;
  },
};
