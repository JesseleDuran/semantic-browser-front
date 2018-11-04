import React, { Component } from "react";
import { connect } from "react-redux";
import ConfigIntegrationPage from "ConfigIntegrationPage";
import { selectStore } from "actions/store";
import _ from "lodash";
import translate from "utils/translate";
import { showError } from "actions/UI";
class ConfigIntegrationContainer extends Component {
	state = {
		store: 0,
		branchOrAlly: true, // False for Branch and True for Ally,
		loadFile: false
	};

	selectBranchOrAlly = branchOrAlly => {
		this.setState({ branchOrAlly });
	};

	onSelectStore = store => {
		this.setState({ store });
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.selected !== this.props.selected && nextProps.selected > 0)
			this.props.changePage(this.state.loadFile ? 1 : 2);
	};

	onClickInitMapping = () => {
		const { branchOrAlly } = this.state;
		const { integration } = this.props;
		const superStore = _.find(
			integration.stores,
			item => item.superStoreId == null
		);
		if (!superStore && branchOrAlly)
			this.props.showError(translate("theresNoFatherStore"));
		else {
			const store = branchOrAlly ? superStore.id : this.state.store;
			this.props.selectStore(store);
		}
	};

	loadFileCheck = loadFile => {
		this.setState({ loadFile });
	};

	render = () => {
		return (
			<ConfigIntegrationPage
				branchOrAlly={this.state.branchOrAlly}
				loadFile={this.state.loadFile}
				loadFileCheck={this.loadFileCheck}
				selectBranchOrAlly={this.selectBranchOrAlly}
				onSelectStore={this.onSelectStore}
				onClickInitMapping={this.onClickInitMapping}
				{...this.props}
			/>
		);
	};
}

const mapStateToProps = state => ({
	selected: state.store.selected
});

export default connect(
	mapStateToProps,
	{ selectStore, showError }
)(ConfigIntegrationContainer);
