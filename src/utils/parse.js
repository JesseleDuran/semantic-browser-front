import _ from "lodash";

export const parseBasicSearch = data => {
	const generateLink = item => {
		let link = "/";
		switch (item.model) {
			case "user":
				link += "user";
				break;
			case "company":
				link += "company";
				break;
			case "job":
				link += "job";
				break;
			default:
		}
		return link + "/" + item._id;
	};

	return data.map(item => ({
		link: generateLink(item),
		name: item.fullName || item.name || item.title,
		logo: item.logo || item.profileThumbnail || item.profileImage,
		id: item.id || item._id
	}));
};

export const parseAddressComponents = address => {
	const components = address.address_components;

	if (!components) {
		return address;
	}

	const componentTypes = {
		city: ["locality", "sublocality"],
		state: ["administrative_area_level_1", "administrative_area_level_2"],
		country: ["country"],
		zip: ["postal_code"]
	};

	const findComponent = (val, type) => {
		const component = _.find(components, component => {
			return _.includes(component.types, type);
		});
		const componentText = component ? component.long_name : undefined;
		return val ? val : componentText;
	};

	const parsedAddress = _.mapValues(componentTypes, types => {
		return _.reduce(types, findComponent, undefined) || "";
	});

	const geoPos = address.geometry
		? [address.geometry.location.lng(), address.geometry.location.lat()]
		: [];

	return { ...parsedAddress, geoPos, fullAddress: address.text };
};

export const parseJobType = type => {
	return _.reduce(
		type,
		(res, isTrue, key) => {
			switch (key) {
				case "contract":
					return isTrue ? [...res, "Contract"] : res;
				case "internship":
					return isTrue ? [...res, "Internship"] : res;
				case "fullTime":
					return isTrue ? [...res, "Full time"] : res;
				case "partTime":
					return isTrue ? [...res, "Part time"] : res;
				case "relocation":
					return isTrue ? [...res, "Relocation"] : res;
				case "sponsorship":
					return isTrue ? [...res, "Visa Sponsor"] : res;
				case "remote":
					return isTrue ? [...res, "Remote"] : res;
				default:
					if (key !== "_id") {
						console.error("====================================");
						console.error(`case ${key} not handled by parseJobType`);
						console.error("====================================");
					}
					return res;
			}
		},
		[]
	);
};
