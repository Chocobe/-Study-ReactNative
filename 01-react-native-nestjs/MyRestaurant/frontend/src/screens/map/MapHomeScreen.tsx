import {
    Pressable,
    View,
    StyleSheet,
} from 'react-native';
import {
    useRef,
    useCallback,
} from 'react';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { 
    colors, 
} from '@/constants';
import { 
    DrawerNavigationProp, 
} from '@react-navigation/drawer';
import MapView, {
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import mapStyle from '@/style/mapStyle';
import { 
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { 
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { 
    StackNavigationProp, 
} from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// MapHomeScreen 는 StackNavigation, DrawerNavigation 두개가 혼합된 형식이다.
// => 이전페이지로 이동할 때는, `DrawerNavigation`
// => MapHomeScreen 의 하위 페이지는 `StackNavigation`
type Navigation = CompositeNavigationProp<
    DrawerNavigationProp<MainDrawerParamList>,
    StackNavigationProp<MapStackParamList>
>;

function MapHomeScreen() {
    const $mapViewRef = useRef<MapView | null>(null);

    // const [userLocation, setUserLocation] = useState<LatLng>({
    //     latitude: 37.5516032365118,
    //     longitude: 125.98989626020192,
    // });
    // const [isUserLocationError, setIsUserLocationError] = useState(false);

    const inset = useSafeAreaInsets();
    const navigation = useNavigation<Navigation>();

    usePermission('LOCATION');

    const {
        userLocation,
        isUserLocationError,
    } = useUserLocation();

    const handlePressUserLocation = useCallback(() => {
        // 에러가 있다면,
        if (isUserLocationError) {
            // 에러 메시지 안내
            return;
        }

        // $mapView 를 내 위치로 이동시키기
        const $mapView = $mapViewRef.current;
        const {
            latitude,
            longitude,
        } = userLocation;

        $mapView?.animateToRegion({
            latitude,
            longitude,
            // 위도 확대 정도
            latitudeDelta: 0.0421,
            // 경도 확대 정도
            longitudeDelta: 0.0922,
        });
    }, [isUserLocationError, userLocation]);

    // 내 위치 이동 기능 구현
    // 2. 지도를 내 위치로 이동시키기
    // useEffect(function initUserLocation() {
    //     // 1. 내 위치값 구하기
    //     // 1. 내 위치값 구하기
    //     Geolocation.getCurrentPosition(info => {
    //         const {
    //             longitude,
    //             latitude,
    //         } = info.coords;

    //         setUserLocation({
    //             longitude,
    //             latitude,
    //         });
    //         setIsUserLocationError(false);

    //         console.group('유저 위치 정보:');
    //         console.log('longitude: ', longitude);
    //         console.log('latitude: ', latitude);
    //         console.groupEnd();
    //     }, error => {
    //         console.group('유저 위치 정보 에러 발생:');
    //         console.log('error:', error);
    //         console.groupEnd();

    //         setIsUserLocationError(true);
    //     }, {
    //         enableHighAccuracy: true,
    //     });
    // }, []);

    return (<>
        <MapView
            ref={$mapViewRef}
            provider={PROVIDER_GOOGLE}
            style={styles.container}
            customMapStyle={mapStyle}
            // 사용자 위치를 Map에 보여주는 설정 (사용자 위치 정보 접근 권한 필요)
            showsUserLocation
            // Map 이 사용자의 위치를 포커스 한다. (showsUserLocation 이 `true` 설정 필요)
            followsUserLocation
            // 내 위치로 이동하는 버튼 사용 여부
            // 직접 구현할 예정이므로, `false` 로 설정함
            showsMyLocationButton={false} />

        <Pressable
            style={[
                styles.drawerButton,
                { top: inset.top || 20 },
            ]}
            onPress={() => navigation.openDrawer()}>
            <Ionicons
                name="menu"
                color={colors.WHITE}
                size={25} />
        </Pressable>

        <View style={styles.buttonList}>
            <Pressable
                style={styles.mapButton}
                // onPress={() => {
                //     const {
                //         longitude,
                //         latitude,
                //     } = userLocation;

                //     console.group('내 위치 버튼 클릭');
                //     console.log('longitude: ', longitude);
                //     console.log('latitude: ', latitude);
                //     console.groupEnd();
                // }}
                onPress={handlePressUserLocation}>
                <MaterialIcons
                    name="my-location"
                    color={colors.WHITE}
                    size={25} />
            </Pressable>
        </View>
    </>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    drawerButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        position: 'absolute',
        // `20` 절대값을 사용하면, 모바일 기기의 `노치` 부분에 잘리는 현상이 발생할 수 있다.
        // => `useSafeAreaInsets()` 를 사용하여 기기별로 `노치` 영역을 구할 수 있다.
        // top: 20,
        left: 0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: colors.PINK_700,

        // // ios 용 `shadow` 설정
        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,

        // // android 용 `shadow` 설정
        elevation:5,

        // 아래 스타일을 적용해 보아도 android 에서 그림자가 나타나지 않음
        // shadowColor: colors.BLACK,
        // ...Platform.select({
        //     ios: {
        //         shadowOffset: {
        //             width: 5,
        //             height: 5,
        //         },
        //         shadowOpacity: 0.5,
        //     },
        //     android: {
        //         elevation: 10,
        //         shadowOffset: { 
        //             width: 0, 
        //             height: 2,
        //         },
        //         shadowOpacity: 0.5,
        //         shadowRadius: 5,
        //         zIndex: 99,
        //     },
        // }),
    },

    buttonList: {
        position: 'absolute',
        bottom: 30,
        right: 15,
    },
    mapButton: {
        marginVertical: 5,
        width: 48,
        height: 48,

        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 30,
        backgroundColor: colors.PINK_700,

        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 1,
        elevation: 2,
    },
});

export default MapHomeScreen;
