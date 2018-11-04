import React, { Component } from "react";
import { connect } from "react-redux";
import { putItems } from "api/restaurant";
import { addMappedItem } from "actions/mapped";
import MappedRelations from "MappedRelations";
import _ from "lodash";
import { showRequestError } from "actions/UI";

class MappedRelationsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: props.items,
			page: 0,
			filter: "",
			selected: [],
			testModal: false,
			rowsPerPage: 10
		};
	}

	componentWillReceiveProps(nextProps) {
		this.filterWithItems(this.state.filter, nextProps.items);
	}

	changeRowsPerPage = (evt, rowsPerPage) => {
		this.setState({ rowsPerPage: evt.target.value });
	};

	onSelect = (value, data) => {
		const { selected, filtered } = this.state;
		const item = filtered.filter(i => i.id === data.id)[0];
		const newState = value
			? [...selected, item]
			: selected.filter(item => item.id !== data.id);
		this.setState({ selected: newState });
	};

	onSave = () => {
		this.updateItems(item => {
			item.mappingState = "mapped";
			item.metadata = JSON.stringify(item.metadata);
			return item;
		});
	};

	filter = value => {
		const { items } = this.props;
		const filtered = items.filter(item => this.filterItem(item, value));
		this.setState({ filtered, filter: value });
	};

	filterWithItems = (value, items) => {
		const filtered = items.filter(item => this.filterItem(item, value));
		this.setState({ filtered, filter: value });
	};

	filterItem = (item, value) => {
		return (
			item.name.toLowerCase().includes(value.toLowerCase()) ||
			item.sku.includes(value)
		);
	};

	onChangePage = (evt, page) => {
		this.setState({ page, selected: [] });
	};

	selectAll = () => {
		const { page, filtered, rowsPerPage } = this.state;
		const itemsIndex = page * rowsPerPage;
		const toSelect = filtered.slice(itemsIndex, itemsIndex + rowsPerPage);
		const all = this.state.selected.length != toSelect.length;
		this.setState({ selected: all ? toSelect : [] });
	};

	onDelete = () => {
		this.updateItems(item => {
			item.enable = false;
			item.metadata = JSON.stringify(item.metadata);
			return item;
		});
	};

	onError = err => {
		this.props.showRequestError(err);
	};

	updateItems = update => {
		const { selected } = this.state;
		const items = this.toItems(selected);
		const updated = items.map(update);
		putItems(updated)
			.then(result => {
				this.props.addMappedItem(result.data);
				this.setState({ selected: [] });
			})
			.catch(this.onError);
	};

	toItems = selected => {
		const { items } = this.props;
		return selected
			.map(item => _.find(items, i => i.id == item.id))
			.filter(i => i);
	};

	onItemClick = item => {
		const data = this.toItems([item]);
		this.props.openModal(data[0]);
	};

	onOpenTestModal = () => {
		this.setState({ testModal: true });
	};

	onCloseTestModal = () => {
		this.setState({ testModal: false });
	};

	render = () => {
		return <MappedRelations {...this.props} {...this.state} {...this} />;
	};
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ addMappedItem, showRequestError }
)(MappedRelationsContainer);
