export const getHostname = () => {
	const { port, protocol, hostname } = window.location;
	return `${protocol}//${hostname}${port ? ":" + port : ""}`;
};

export const removeKeys = (obj, keysToRemove) => {
	const keys = Object.keys(obj).filter(key => keysToRemove.indexOf(key) === -1);
	const resultObj = {};
	keys.forEach(key => (resultObj[key] = obj[key]));
	return resultObj;
};

export const replaceAll = (str, find, replace) => {
	return str.replace(new RegExp(find, "g"), replace);
};
