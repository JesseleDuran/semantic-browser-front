import React, { Component } from "react";
import { connect } from "react-redux";
import LoadFilePage from "LoadFilePage";
import csv from "csvtojson";
import { postItem } from "api/restaurant";
import { UploadStateEnum } from "DropZone";
import { updateItems } from "actions/restaurant";
import { removeKeys } from "utils/functions";

class LoadFileContainer extends Component {
	state = {};

	findStore = (stores, selected) => {
		return stores.filter(store => store.id === selected)[0];
	};

	onFileUploaded = (file, stater) => {
		const reader = new FileReader();
		reader.onload = () => this.toCSV(reader, stater);
		reader.onabort = () => stater(UploadStateEnum.error);
		reader.onerror = () => stater(UploadStateEnum.error);
		reader.readAsText(file);
	};

	toCSV = (reader, stater) => {
		const fileAsString = reader.result;
		stater(UploadStateEnum.uploading);
		csv({ delimiter: [",", ";"] })
			.fromString(fileAsString)
			.then(json => this.processJson(json, stater))
			.then(results => this.onResult(results, stater))
			.catch(err => stater(UploadStateEnum.error));
	};

	processJson = (json, stater) => {
		const values = json.filter(item => item.sku && item.name);
		if (values.length === 0) stater(UploadStateEnum.error);
		const store = this.findStore(this.props.stores, this.props.selected);
		const items = this.mapItems(values, store.id);
		return postItem(items);
	};

	mapItems = (values, store) => {
		return values.map(item => {
			return {
				...item,
				store: store,
				metadata: JSON.stringify(removeKeys(item, ["sku", "name", "price"]))
			};
		});
	};

	onResult = (results, stater) => {
		stater(UploadStateEnum.success);
		this.props.updateItems(results.data);
		this.props.changePage(2);
	};

	render = () => {
		const store = this.findStore(this.props.stores, this.props.selected);
		return <LoadFilePage store={store} onFileUploaded={this.onFileUploaded} />;
	};
}

const mapStateToProps = state => ({
	stores: state.integration.byId[state.integration.selected].stores,
	selected: state.store.selected
});

export default connect(
	mapStateToProps,
	{ updateItems }
)(LoadFileContainer);
