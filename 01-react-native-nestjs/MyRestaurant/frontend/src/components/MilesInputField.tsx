import {
    useRef,
    useCallback,
    memo,
} from 'react';
import {
    Pressable,
    View,
    TextInput,
    TextInputProps,
    Text,
    StyleSheet,
} from 'react-native';
import { colors } from '../constants';
import { MEDIA_HEIGHT } from '../constants/media';
import getDeviceDimensions from '../utils/getDeviceDimensions';

const { deviceHeight } = getDeviceDimensions();

interface MilesInputFieldProps extends TextInputProps {
    disabled?: boolean;
    touched?: boolean;
    error?: string;
};

function MilesInputField({
    disabled = false,
    touched = false,
    error,
    ...props
}: MilesInputFieldProps) {
    const $inputRef = useRef<TextInput | null>(null);

    const onPress = useCallback(() => {
        $inputRef.current?.focus();
    }, []);

    return (
        <Pressable onPress={onPress}>
            <View 
                style={[
                    styles.container,
                    disabled && styles.disabled,
                    !!error && touched && styles.error,
                ]}>
                <TextInput 
                    ref={$inputRef}
                    style={[
                        styles.input,
                        disabled && styles.disabled,
                    ]}
                    placeholderTextColor={colors.GRAY_500}
                    editable={!disabled}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    {...props}  />
                {!!error && touched && (
                    <Text style={styles.errorMessage}>
                        {error}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // container
    container: {
        borderWidth: 1,
        borderColor: colors.GRAY_200,
        padding: deviceHeight > MEDIA_HEIGHT ? 15 : 10,
    },
    disabled: {
        backgroundColor: colors.GRAY_200,
        color: colors.GRAY_700,
    },
    error: {
        borderWidth: 1,
        borderColor: colors.RED_300,
    },
    // input
    input: {
        color: colors.BLACK,
        fontSize: 16,
        padding: 0,
    },
    // errorMessage
    errorMessage: {
        padding: 5,
        color: colors.RED_500,
        fontSize: 12,
    },
});

export default memo(MilesInputField);
