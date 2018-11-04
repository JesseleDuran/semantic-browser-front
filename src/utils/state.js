import store from "store";

export const getToken = () => store.getState().auth.accessToken;

export const mapIdsToValues = (ids, values, mutator = value => value) => {
	return (ids || []).map(id => {
		return mutator(values[id]);
	});
};

export const getOrdered = (reducer, mutator) => {
	return mapIdsToValues(reducer.allIds, reducer.byId, mutator);
};

export const getNestedOrdered = (reducer, childReducer, ...fields) => {
	const mutator = value => {
		const mutated = {};
		for (let field of fields) {
			mutated[field] = childReducer.byId[value[field]];
		}
		return { ...value, ...mutated };
	};
	return getOrdered(reducer, mutator);
};

export const categorizeValuesByField = (values, field, limit) => {
	const categories = {};
	for (let value of values) {
		if (categories[value[field]] === undefined) {
			categories[value[field]] = [];
		}

		if (limit === undefined || categories[value[field]].length < limit) {
			categories[value[field]].push(value);
		}
	}
	return categories;
};
