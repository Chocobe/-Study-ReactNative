import { 
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { colors, mainNavigations } from '@/constants';
// import MapHomeScreen from '@/screens/map/MapHomeScreen';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

export type MainDrawerParamList = {
    [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>,
    [mainNavigations.FEED]: undefined,
    [mainNavigations.CALENDAR]: undefined,
};

function DrawerIcons(
    route: RouteProp<MainDrawerParamList, keyof MainDrawerParamList>,
    focused: boolean
) {
    let iconName = '';

    switch (route.name) {
        case mainNavigations.HOME:
            iconName = 'location-on';
            break;
        case mainNavigations.FEED:
            iconName = 'book';
            break;
        case mainNavigations.CALENDAR:
            iconName = 'event-note';
            break;
    }

    return (
        <MaterialIcons
            name={iconName}
            color={focused ? colors.BLACK : colors.GRAY_500}
            size={18} />
    );
}

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName={mainNavigations.HOME}
            // screenOptions={{
            //     drawerType: 'front',
            //     headerShown: false,
            // }}
            screenOptions={({ route }) => ({
                drawerType: 'front',
                headerShown: false,
                drawerIcon: ({ focused }) => DrawerIcons(route, focused),
                drawerStyle: {
                    width: Dimensions.get('screen').width * 0.6,
                    backgroundColor: colors.WHITE,
                },
                drawerActiveTintColor: colors.BLACK,
                drawerActiveBackgroundColor: colors.PINK_200,
                drawerInactiveTintColor: colors.GRAY_500,
                drawerInactiveBackgroundColor: colors.GRAY_100,
                drawerLabelStyle: {
                    fontWeight: '600',
                },
            })}
            drawerContent={CustomDrawerContent}
        >
            <Drawer.Screen
                name={mainNavigations.HOME}
                component={MapStackNavigator}
                options={{
                    title: '홈',
                    swipeEnabled: false,
                }} />
            <Drawer.Screen
                name={mainNavigations.FEED}
                component={FeedHomeScreen}
                options={{
                    title: '피드',
                }} />
            <Drawer.Screen
                name={mainNavigations.CALENDAR}
                component={CalendarHomeScreen}
                options={{
                    title: '캘린더',
                }} />
        </Drawer.Navigator>
    );
}

export default MainDrawerNavigator;
