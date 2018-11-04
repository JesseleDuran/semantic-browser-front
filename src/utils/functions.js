import _ from "lodash";
import store from "store";

export const findInItem = (id, item) => {
	return _.find(item.items, item => item.sku === id);
};

export const findMappedItem = (id, items) => {
	let result = _.find(items, item => item.indexes.indexOf(id) !== -1);
	if (result) return result;
	else {
		for (let i = 0; i < items.length; i++) {
			result = _.find(items[i].items, item => item.indexes.indexOf(id) !== -1);
			if (result) return result;
		}
	}
	return null;
};

export const parseMapMetadata = item => {
	try {
		item.metadata = JSON.parse(item.metadata);
	} catch (error) {}
	return item;
};

export const removeKeys = (obj, keysToRemove) => {
	const keys = Object.keys(obj).filter(key => keysToRemove.indexOf(key) === -1);
	const resultObj = {};
	keys.forEach(key => (resultObj[key] = obj[key]));
	return resultObj;
};
