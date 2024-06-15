// navigation
import { 
    createStackNavigator,
} from '@react-navigation/stack';
// constants
import { 
    mapNavigations,
} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={mapNavigations.MAP_HOME}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#383841',
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: '#000',
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Stack.Screen
                name={mapNavigations.MAP_HOME}
                component={MapHomeScreen}
                options={{
                    headerTitle: ' ',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default MapStackNavigator;
