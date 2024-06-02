import {
    useMemo,
} from 'react';
import { 
    Pressable,
    View,
    Text,
    StyleSheet,
    PressableProps,
    Dimensions,
} from 'react-native';
import { colors } from '../constants';

const MEDIA_HEIGHT = 700;
const deviceHeight = Dimensions.get('screen').height;

interface MilesButtonProps extends PressableProps {
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    invalid?: boolean;
};

function MilesButton({
    label,
    variant = 'filled',
    size = 'large',
    invalid = false,
    ...props
}: MilesButtonProps) {
    const labelStyle = useMemo(() => [
        styles.label,
        styles[`${variant}Label`],
    ], [variant]);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                invalid && styles.invalid,
                pressed ? styles[`${variant}Pressed`] : styles[variant],
            ]}
            disabled={invalid}
            {...props}>
            <View style={styles[size]}>
                <Text
                    style={labelStyle}>
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // container
    container: {
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    filled: {
        backgroundColor: colors.PINK_700,
    },
    outlined: {
        borderColor: colors.PINK_700,
        borderWidth: 1,
    },
    filledPressed: {
        backgroundColor: colors.PINK_500,
    },
    outlinedPressed: {
        borderColor: colors.PINK_700,
        borderWidth: 1,
        opacity: 0.5,
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > MEDIA_HEIGHT ? 15 : 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > MEDIA_HEIGHT ? 12 : 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalid: {
        opacity: 0.5,
    },

    // label
    label: {
        fontSize: 16,
        fontWeight: 700,
    },
    filledLabel: {
        color: colors.WHITE,
    },
    outlinedLabel: {
        color: colors.PINK_700,
    }
});

export default MilesButton;
