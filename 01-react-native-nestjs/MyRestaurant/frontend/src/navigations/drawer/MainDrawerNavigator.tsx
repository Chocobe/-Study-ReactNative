import { 
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { mainNavigations } from '../../constants';
import MapHomeScreen from '../../screens/map/MapHomeScreen';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '../../screens/calendar/CalendarHomeScreen';

export type MainDrawerParamList = {
    [mainNavigations.MAP_HOME]: undefined,
    [mainNavigations.FEED_HOME]: undefined,
    [mainNavigations.CALENDAR_HOME]: undefined,
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName={mainNavigations.MAP_HOME}>
            <Drawer.Screen
                name={mainNavigations.MAP_HOME}
                component={MapHomeScreen} />
            <Drawer.Screen
                name={mainNavigations.FEED_HOME}
                component={FeedHomeScreen} />
            <Drawer.Screen
                name={mainNavigations.CALENDAR_HOME}
                component={CalendarHomeScreen} />
        </Drawer.Navigator>
    );
}

export default MainDrawerNavigator;
