import React, { Component } from "react";
import { connect } from "react-redux";
import { putItems } from "api/restaurant";
import SimulatedProductsPage from "SimulatedProductsPage";
import { addItem, updateItems } from "actions/simulated";
import { showRequestError } from "actions/UI";

class SimulatedProductsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: props.items,
			page: 0,
			filter: "",
			selected: [],
			modal: false,
			rowsPerPage: 10
		};
	}

	findStore = (stores, selected) => {
		return stores.filter(store => store.id === selected)[0];
	};

	componentWillReceiveProps(nextProps) {
		this.filterWithItems(this.state.filter, nextProps.items);
	}

	onSelect = (value, data) => {
		const { selected, filtered } = this.state;
		const item = filtered.filter(i => i.id === data.id)[0];
		const newState = value
			? [...selected, item]
			: selected.filter(item => item.id !== data.id);
		this.setState({ selected: newState });
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
		return item.name.toLowerCase().includes(value.toLowerCase());
	};

	onChangePage = page => {
		this.setState({ page: page - 1, selected: [] });
	};

	updateItems = update => {
		const { selected } = this.state;
		const updated = selected.map(update);
		putItems(updated)
			.then(result => {
				this.props.updateItems(result.data);
				this.setState({ selected: [] });
			})
			.catch(this.onError);
	};

	selectAll = () => {
		const { page, filtered, rowsPerPage } = this.state;
		const itemsIndex = page * rowsPerPage;
		const toSelect = filtered.slice(itemsIndex, itemsIndex + rowsPerPage);
		const all = this.state.selected.length !== toSelect.length;
		this.setState({ selected: all ? toSelect : [] });
	};

	onDelete = () => {
		this.updateItems(item => {
			item.enable = "false";
			return item;
		});
	};

	onRowsChange = evt => {
		this.setState({ rowsPerPage: evt.target.value });
	};

	openModal = () => {
		this.setState({ modal: true });
	};

	closeModal = () => {
		this.setState({ modal: false });
	};

	onAdd = ({ name, price, sku }) => {
		const store = this.findStore(
			this.props.integration.stores,
			this.props.storeSelected
		);
		const item = { name, price, sku, type: "fake", store: store.id };
		this.props
			.addItem(item)
			.then(res => this.setState({ modal: false }))
			.catch(this.onError);
	};

	onError = err => {
		this.props.showRequestError(err);
	};

	onItemClick = item => {};

	render = () => {
		const { filtered, page, rowsPerPage } = this.state;
		const itemsIndex = page * rowsPerPage;
		const showedData = filtered.slice(itemsIndex, itemsIndex + rowsPerPage);
		return (
			<SimulatedProductsPage
				{...this.state}
				{...this.props}
				{...this}
				count={filtered.length}
				data={showedData}
			/>
		);
	};
}

const mapStateToProps = state => ({
	items: state.simulated.items,
	integration: state.integration.byId[state.integration.selected],
	storeSelected: state.store.selected
});

export default connect(
	mapStateToProps,
	{
		addItem,
		updateItems,
		showRequestError
	}
)(SimulatedProductsContainer);
