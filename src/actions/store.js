import * as constants from "./constants";
import { getItems as getRestaurantItems } from "api/restaurant";
import { homePageLoading, showRequestError } from "./UI";
import { normalize } from "normalizr";
import itemSchema from "schemas/item";
import { parseMapMetadata } from "utils/functions";

const storeSelected = store => dispatch => {
	dispatch({
		type: constants.SELECT_STORE,
		payload: {
			store
		}
	});
};

const dispatchRestaurantItems = items => dispatch => {
	dispatch({
		type: constants.ADD_RESTAURANT_ITEMS,
		payload: {
			items: items.filter(item => item.type === "real")
		}
	});
};

const dispatchMappedItems = items => dispatch => {
	dispatch({
		type: constants.ADD_MAPPED_ITEMS,
		payload: {
			items: items.filter(
				item => item.indexes.length > 0 && item.type === "real"
			)
		}
	});
};

const dispatchSimulatedItems = items => dispatch => {
	dispatch({
		type: constants.ADD_SIMULATED_ITEMS,
		payload: {
			items: items.filter(item => item.type === "fake")
		}
	});
};

const prepareItems = data => {
	return data.map(item => {
		item.metadata = JSON.parse(item.metadata);

		item.exclusive = item.items
			.map(parseMapMetadata)
			.filter(i => i.metadata.toppingType === "exclusive");
		item.inclusive = item.items
			.map(parseMapMetadata)
			.filter(i => i.metadata.toppingType === "inclusive");
		return item;
	});
};
