// navigation
import {
    createStackNavigator,
} from '@react-navigation/stack';
// screen
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';

function AuthStackNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="AuthHomeScreen">
            <Stack.Screen
                name="AuthHomeScreen"
                component={AuthHomeScreen} />
            <Stack.Screen
                name="Login"
                component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator;
