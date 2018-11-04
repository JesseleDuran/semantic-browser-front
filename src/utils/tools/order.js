export const generateOrdersByItem = (item, storeId) => {
	const { exclusive, inclusive } = item;
	let orders = [];
	if (exclusive.length > 0)
		orders = exclusive.map(exclusiveItem =>
			generateOrderWith(item, exclusiveItem, inclusive, storeId)
		);
	else {
		orders.push(generateOrderWith(item, null, inclusive, storeId));
	}
	return orders;
};

export const generateOrderWith = (
	item,
	exclusiveItem,
	inclusiveItems,
	storeId
) => {
	const product = {
		name: item.name,
		id: Number(item.sku),
		totalPrice: Number(item.price),
		unitPrice: Number(item.price),
		comments: "Test Comment",
		units: 1,
		toppings: exclusiveItem
			? generateToppings([exclusiveItem, ...inclusiveItems])
			: generateToppings(inclusiveItems)
	};
	const products = [product];
	return {
		id: Math.floor(Math.random() * 50000000000) + 10000,
		userId: 0,
		products,
		totalValue: item.price,
		storeId
	};
};

export const generateToppings = toppings => {
	return toppings.map(topping => ({
		id: Number(topping.sku),
		price: Number(topping.price),
		description: topping.name,
		units: 1,
		index: 1,
		toppingCategoryId: Number(topping.metadata.toppingCategoryId),
		categoryIndex: 0
	}));
};
