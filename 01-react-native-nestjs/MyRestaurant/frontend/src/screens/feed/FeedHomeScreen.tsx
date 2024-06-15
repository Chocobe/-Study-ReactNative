import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { mainNavigations } from '@/constants';
import { DrawerScreenProps } from '@react-navigation/drawer';

type FeedHomeScreenProps = DrawerScreenProps<
    MainDrawerParamList,
    typeof mainNavigations.FEED
>;

function FeedHomeScreen(_props: FeedHomeScreenProps) {
    return(
        <SafeAreaView>
            <View>
                <Text>
                    Feed Home Screen
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default FeedHomeScreen;
