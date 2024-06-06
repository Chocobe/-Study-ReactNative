import EncryptStorage from 'react-native-encrypted-storage';

export const setEncryptStorage = async <T>(key: string, data: T) => {
    await EncryptStorage.setItem(key, JSON.stringify(data));
};

export const getEncryptStorage = async (key: string) => {
    const storeData = await EncryptStorage.getItem(key);

    return storeData ? JSON.parse(storeData) : null;
};

export const removweEncryptItem = async (key: string) => {
    const storeData = await getEncryptStorage(key);

    if (storeData) {
        EncryptStorage.removeItem(key);
    }
};
