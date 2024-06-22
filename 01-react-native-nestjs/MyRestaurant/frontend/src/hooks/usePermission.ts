import {
    useEffect,
} from 'react';
import { 
    Alert,
    Linking,
    Platform,
} from 'react-native';
import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
    Permission,
} from 'react-native-permissions';
import {
    alerts,
} from '../constants/messages';

type PermissionType = 'LOCATION' | 'PHOTO';
type PermissionOS = {
    [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
    LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
    LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const usePermission = (permissionType: PermissionType) => {
    const showPermission = () => {
        Alert.alert(
            // '위치 권한 허용이 필요합니다.',
            // '설정 화면에서 위치 권한을 허용해주세요.',
            alerts[`${permissionType}_PERMISSION`].TITLE,
            alerts[`${permissionType}_PERMISSION`].DESCRIPTION,
            [
                {
                    text: '설정하기',
                    onPress: () => {
                        Linking.openSettings();
                    },
                },
                {
                    text: '취소',
                    style: 'cancel',
                },
            ],
        );
    };

    useEffect(() => {
        (async () => {
            const isAndroid = Platform.OS === 'android';
            const permissionOS = isAndroid
                ? androidPermissions
                : iosPermissions;

            const checked = await check(permissionOS[permissionType]);

            console.log('checked: ', checked);

            switch (checked) {
                case RESULTS.DENIED:
                    if (isAndroid) {
                        request(permissionOS[permissionType]);
                        break;
                    }
                case RESULTS.BLOCKED:
                case RESULTS.LIMITED:
                    console.log('showPermission()');

                    showPermission();
                    break;
                default:
                    break;
            }
        })();
    }, []);
};

export default usePermission;
