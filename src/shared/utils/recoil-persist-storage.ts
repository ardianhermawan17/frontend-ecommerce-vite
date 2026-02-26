import type { AtomEffect } from 'recoil';

interface PersistOptions<T> {
	serialize?: (value: T) => string;
	deserialize?: (value: string) => T;
}

const recoilPersistStorage =
	<T>(key: string, options?: PersistOptions<T>): AtomEffect<T> =>
	({ setSelf, onSet }) => {
		const serialize = options?.serialize || ((v: T) => JSON.stringify(v));
		const deserialize =
			options?.deserialize || ((v: string) => JSON.parse(v) as T);

		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			try {
				setSelf(deserialize(savedValue));
			} catch (e) {
				console.error(`Failed to deserialize ${key}:`, e);
			}
		}

		onSet((newValue, _, isReset) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, serialize(newValue));
		});
	};

export default recoilPersistStorage;
