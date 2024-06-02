import {
    Dimensions,
} from 'react-native';

function getDeviceDimensions(
    dim: Parameters<typeof Dimensions.get>[0] = 'screen'
) {
    const {
        width,
        height,
        scale,
        fontScale,
    } = Dimensions.get(dim);

    return {
        deviceWidth: width,
        deviceHeight: height,
        deviceScale: scale,
        deviceFontScale: fontScale,
    };
}

export default getDeviceDimensions;
