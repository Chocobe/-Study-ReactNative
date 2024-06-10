import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { mainNavigations } from '@/constants';

type CalendarHomeScreenProps = DrawerScreenProps<
    MainDrawerParamList,
    typeof mainNavigations.CALENDAR_HOME
>;

function CalendarHomeScreen(_props: CalendarHomeScreenProps) {
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Calendar Home Screen
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default CalendarHomeScreen;
