import {
    useState,
    useCallback,
    useEffect,
} from 'react';

interface BaseT extends Record<string, any> {};

interface UseFormParams<T extends BaseT> {
    initialValue: T;
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T extends BaseT>({ 
    initialValue,
    validate,
}: UseFormParams<T>) {
    const [values, setValues] = useState<T>(initialValue);
    const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
        return Object
            .keys(initialValue)
            .reduce((touched, name) => ({
                ...touched,
                [name]: false,
            }), {} as Record<keyof T, boolean>);
    });
    const [errors, setErrors] = useState<Record<keyof T, string>>(() => {
        return validate(values);
    });

    const handleChangeText = useCallback((
        name: keyof T,
        text: string
    ) => {
        setValues(values => ({
            ...values,
            [name]: text,
        }));
    }, []);

    const handleBlur = useCallback((name: keyof T) => {
        setTouched(touched => ({
            ...touched,
            [name]: true,
        }));
    }, []);

    const getTextInputProps = useCallback((name: keyof T) => {
        const value = values[name];
        const _touched = touched[name as string];
        const error = errors[name];

        const onChangeText = (text: string) => {
            handleChangeText(name, text);
        };

        const onBlur = () => {
            handleBlur(name);
        };

        return {
            value,
            touched: _touched,
            error,
            onChangeText,
            onBlur,
        };
    }, [
        values, touched, errors,
        handleChangeText, handleBlur,
    ]);

    useEffect(() => {
        setErrors(validate(values));
    }, [values]);

    return {
        values,
        touched,
        errors,
        getTextInputProps,
    };
}

export default useForm;
