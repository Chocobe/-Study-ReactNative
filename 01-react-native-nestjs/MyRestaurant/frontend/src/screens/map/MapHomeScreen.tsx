import {
    SafeAreaView,
    Text,
    Button,
} from 'react-native';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { mainNavigations } from '@/constants';
import { DrawerScreenProps } from '@react-navigation/drawer';
import useAuth from '@/hooks/queries/useAuth';

type MapHomeScreenProps = DrawerScreenProps<
    MainDrawerParamList,
    typeof mainNavigations.MAP_HOME
>;

function MapHomeScreen(_props: MapHomeScreenProps) {
    const { logoutMutation } = useAuth();

    return (
        <SafeAreaView>
            <Text>
                Map Home Screen
            </Text>
            <Button
                title="로그아웃"
                onPress={() => logoutMutation.mutate(null)} />
        </SafeAreaView>
    );
}

export default MapHomeScreen;
