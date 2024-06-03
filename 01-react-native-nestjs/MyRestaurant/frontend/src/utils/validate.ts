const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserInformation = {
    email: string;
    password: string;
};

export const validateUser = (values: UserInformation) => {
    const {
        email,
        password,
    } = values;

    const errors = {
        email: '',
        password: '',
    };

    if (!EMAIL_REGEXP.test(email)) {
        errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (password.length < 4 || password.length > 8) {
        errors.password = '비밀번호는 4 ~ 8 자 사이로 입력해주세요.';
    }

    return errors;
};

export const validateLogin = (values: UserInformation) => {
    // const {
    //     email,
    //     password
    // } = values;

    // // const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // const errors = {
    //     email: '',
    //     password: '',
    // };

    // // if (!emailRegExp.test(email)) {
    // if (!EMAIL_REGEXP.test(email)) {
    //     errors.email = '올바른 이메일 형식이 아닙니다.';
    // }

    // if (password.length < 4 || password.length > 8) {
    //     errors.password = '비밀번호는 4 ~ 8 자 사이로 입력해주세요.';
    // }

    // return errors;
    return validateUser(values);
};

export type SignupInformation = UserInformation & {
    passwordConfirm: string;
};

export const validateSignup = (values: SignupInformation) => {
    const {
        password,
        passwordConfirm,
    } = values;

    // const _errors = {
    //     email: '',
    //     password: '',
    //     passwordConfirm: '',
    // };

    // if (!EMAIL_REGEXP.test(email)) {
    //     _errors.email = '올바른 이메일 형식이 아닙니다.';
    // }

    // if (password.length < 4 || password.length > 8) {
    //     _errors.password = '비밀번호는 4 ~ 8 자 사이로 입력해주세요.';
    // }

    // if (password !== passwordConfirm) {
    //     _errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    // }

    const errors = {
        ...validateUser(values),
        passwordConfirm: '',
    };

    if (passwordConfirm !== password) {
        errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
};
