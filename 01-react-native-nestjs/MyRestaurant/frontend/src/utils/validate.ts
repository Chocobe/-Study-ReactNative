type UserInformation = {
    email: string;
    password: string;
};

export const validateLogin = (values: UserInformation) => {
    const {
        email,
        password
    } = values;

    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
        email: '',
        password: '',
    };

    console.log('validateLogin() - values: ', values);

    if (!emailRegExp.test(email)) {
        errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (password.length < 4 || password.length > 8) {
        errors.password = '비밀번호는 4 ~ 8 자 사이로 입력해주세요.';
    }

    return errors;
};
