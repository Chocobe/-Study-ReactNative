import {
    StyleSheet,
} from 'react-native';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { mainNavigations } from '@/constants';
import { DrawerScreenProps } from '@react-navigation/drawer';
import MapView, {
    PROVIDER_GOOGLE,
} from 'react-native-maps';

type MapHomeScreenProps = DrawerScreenProps<
    MainDrawerParamList,
    typeof mainNavigations.MAP_HOME
>;

function MapHomeScreen(_props: MapHomeScreenProps) {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.container}
            // 사용자 위치를 Map에 보여주는 설정 (사용자 위치 정보 접근 권한 필요)
            showsUserLocation
            // Map 이 사용자의 위치를 포커스 한다. (showsUserLocation 이 `true` 설정 필요)
            followsUserLocation
            // 내 위치로 이동하는 버튼 사용 여부
            // 직접 구현할 예정이므로, `false` 로 설정함
            showsMyLocationButton={false} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MapHomeScreen;
