import {
    AppState,
} from 'react-native';
import {
    useRef,
    useState,
    useEffect,
} from 'react';

const useAppState = () => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [isComeback, setIsComeback] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            console.group('onChange()');
            console.log('appState.current: ', appState.current);
            console.log('nextAppState: ', nextAppState);
            console.groupEnd();

            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                setIsComeback(true);
            } else if (
                appState.current.match(/active/) &&
                (nextAppState === 'background')
            ) {
                setIsComeback(false);
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        }); 

        return () => {
            subscription.remove();
        };
    }, []);

    return {
        isComeback,
        appStateVisible,
        setIsComeback,
    };
};

export default useAppState;
