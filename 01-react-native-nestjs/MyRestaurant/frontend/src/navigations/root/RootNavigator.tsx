import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import { useEffect } from 'react';

function RootNavigator() {
    const { isLogin } = useAuth();

    useEffect(() => {
        console.log('isLogin 바뀜: ', isLogin);
    }, [isLogin]);

    return isLogin
        ? <MainDrawerNavigator />
        : <AuthStackNavigator />;
}

export default RootNavigator;
