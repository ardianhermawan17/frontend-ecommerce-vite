import type { AtomEffect } from 'recoil'

const recoilPersistStorage = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export default recoilPersistStorage;
