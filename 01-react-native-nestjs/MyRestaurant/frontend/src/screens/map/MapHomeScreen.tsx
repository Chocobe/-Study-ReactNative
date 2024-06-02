import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { MainDrawerParamList } from '../../navigations/drawer/MainDrawerNavigator';
import { mainNavigations } from '../../constants';
import { DrawerScreenProps } from '@react-navigation/drawer';

type MapHomeScreenProps = DrawerScreenProps<
    MainDrawerParamList,
    typeof mainNavigations.MAP_HOME
>;

function MapHomeScreen(_props: MapHomeScreenProps) {
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Map Home Screen
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default MapHomeScreen;
