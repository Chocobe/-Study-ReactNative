import { 
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { 
    DrawerContentScrollView, 
    DrawerContentComponentProps,
    DrawerItemList,
} from '@react-navigation/drawer';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';

function CustomDrawerContent(
    props: DrawerContentComponentProps
) {
    const { getProfileQuery } = useAuth();

    const {
        email,
        nickname,
        imageUri,
        kakaoImageUri,
    } = getProfileQuery.data || {};

    return (
        <SafeAreaView style={styles.container}>
            <DrawerContentScrollView
                scrollEnabled={false}
                contentContainerStyle={styles.containerStyle}
                {...props}
            >
                <View style={styles.userInfoContainer}>
                    <View style={styles.userImageContainer}>
                        {!imageUri && !kakaoImageUri && (
                            <Image
                                style={styles.userImage} 
                                source={require('@/assets/user-default.png')} />
                        )}
                        {!imageUri && kakaoImageUri && (
                            <Image
                                style={styles.userImage}
                                source={{
                                    uri: kakaoImageUri,
                                }} />
                        )}
                        {imageUri && (
                            <Image
                                style={styles.userImage}
                                source={{
                                    uri: imageUri,
                                }} />
                        )}
                    </View>

                    <Text style={styles.nameText}>
                        {nickname ?? email}
                    </Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerStyle: {
        backgroundColor: colors.WHITE,
    },

    userImageContainer: {
        marginBottom: 10,
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    userImage: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },

    userInfoContainer: {
        marginTop: 15,
        marginBottom: 30,
        marginHorizontal: 15,
        alignItems: 'center',
    },

    nameText: {
        color: colors.BLACK,
    },
});

export default CustomDrawerContent;
