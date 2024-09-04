export const useStorage = () => {
	const readKey = (key: string): string | null => {
		return localStorage.getItem(key);
	};

	const setKey = (key: string, value: string): void => {
		localStorage.setItem(key, value);
	};

	const removeKey = (key: string): void => {
		localStorage.removeItem(key);
	};

	return {
		readKey,
		setKey,
		removeKey,
	};
};
