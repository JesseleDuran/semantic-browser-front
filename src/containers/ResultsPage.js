import React, { Component } from "react";
import { connect } from "react-redux";
import ResultsPage from "../components/pages/ResultsPage";
import { withRouter } from "react-router-dom";
import { search } from "../api/googleAPI";
import { addLike, removeLike } from "../api/favs";
import { replaceAll } from "../utils/functions";
import { addFav, removeFav } from "../actions/fav";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";

const typeMap = {
	0: null,
	1: "image"
};

const data = {
	kind: "customsearch#search",
	url: {
		type: "application/json",
		template:
			"https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
	},
	queries: {
		request: [
			{
				title: "Google Custom Search - ajax",
				totalResults: "521000000",
				searchTerms: "ajax",
				count: 2,
				startIndex: 1,
				inputEncoding: "utf8",
				outputEncoding: "utf8",
				safe: "active",
				cx: "004019056823071446092:rmosvkn-cfa",
				hl: "es",
				searchType: "image"
			}
		],
		nextPage: [
			{
				title: "Google Custom Search - ajax",
				totalResults: "521000000",
				searchTerms: "ajax",
				count: 2,
				startIndex: 3,
				inputEncoding: "utf8",
				outputEncoding: "utf8",
				safe: "active",
				cx: "004019056823071446092:rmosvkn-cfa",
				hl: "es",
				searchType: "image"
			}
		]
	},
	context: {
		title: "Google",
		facets: [
			[
				{
					label: "programming",
					anchor: "programming",
					label_with_op: "more:programming"
				}
			]
		]
	},
	searchInformation: {
		searchTime: 0.276592,
		formattedSearchTime: "0,28",
		totalResults: "521000000",
		formattedTotalResults: "521.000.000"
	},
	items: [
		{
			kind: "customsearch#result",
			title: "What Is Ajax Programming - Explained - KeyCDN Support",
			htmlTitle: "What Is <b>Ajax</b> Programming - Explained - KeyCDN Support",
			link:
				"https://cdn.keycdn.com/support/wp-content/uploads/2016/11/ajax-programming.png",
			displayLink: "www.keycdn.com",
			snippet: "What Is Ajax Programming - Explained - KeyCDN Support",
			htmlSnippet:
				"What Is <b>Ajax</b> Programming - Explained - KeyCDN Support",
			mime: "image/png",
			image: {
				contextLink: "https://www.keycdn.com/support/ajax-programming",
				height: 1024,
				width: 2048,
				byteSize: 42823,
				thumbnailLink:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbdFmz4PnHWVU0IrA5U8RzzUGebVIaC08N65nYjg5MYPEF_Xo8qcMrxU",
				thumbnailHeight: 75,
				thumbnailWidth: 150
			}
		},
		{
			kind: "customsearch#result",
			title: "Ajax (programming) - Wikipedia",
			htmlTitle: "<b>Ajax</b> (programming) - Wikipedia",
			link:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AJAX_logo_by_gengns.svg/1200px-AJAX_logo_by_gengns.svg.png",
			displayLink: "en.wikipedia.org",
			snippet: "Ajax (programming) - Wikipedia",
			htmlSnippet: "<b>Ajax</b> (programming) - Wikipedia",
			mime: "image/png",
			image: {
				contextLink: "https://en.wikipedia.org/wiki/Ajax_(programming)",
				height: 576,
				width: 1200,
				byteSize: 75757,
				thumbnailLink:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2wikLsS-8vC1YqOKkDaGFRu-AD_Nm1cKOnj4qlnfP0W84pP8ITN9Vq6f",
				thumbnailHeight: 72,
				thumbnailWidth: 150
			}
		}
	]
};

class ResultsPageContainer extends Component {
	state = {
		query: "",
		searchType: null,
		results: null,
		tab: 0,
		page: 1
	};

	componentWillReceiveProps = props => {
		if (!isEqual(props.favs, this.props.favs)) this.sortedFavs(props.favs);
	};

	getQuery = paramString => {
		const params = new URLSearchParams(paramString);
		return params.get("query");
	};

	onQueryChange = query => this.setState({ query });

	search = lucky => {
		this.setState({ results: null }, () => this.onSearch(lucky));
	};

	formatQueryIfNeeded = query => {
		const formatedOrs = replaceAll(query, " o ", " OR ");
		return replaceAll(formatedOrs, " y ", " AND ");
	};

	goToFirstPage = items => {
		window.location = items[0].link;
	};

	onSearch = feelingLucky => {
		const { query, searchType, page } = this.state;
		if(query.length >= 1) {
			search({
				q: this.formatQueryIfNeeded(query),
				searchType,
				start: page
			})
				.then(results => {
					if (feelingLucky) this.goToFirstPage(results.items);
					this.setState({ results }, () => this.sortedFavs(this.props.favs));
				})
				.catch(err => {
					console.log("HEY", err);
				});

			this.setState({ results: data }, () => this.sortedFavs(this.props.favs));
		}
	};

	findFav = i => {
		return f =>
			f.link === i.link || (i.image && f.link === i.image.contextLink);
	};

	sortedFavs = favs => {
		const {
			results: { items },
			results
		} = this.state;
		const sorted = sortBy(items, i => {
			const fav = favs.find(this.findFav(i));
			return fav ? fav.id : 9999999;
		}).map(i => {
			const fav = favs.find(this.findFav(i));
			return fav
				? { ...i, isFav: true, id: fav.id }
				: { ...i, isFav: false, id: false };
		});
		this.setState({ results: { ...results, items: sorted } });
	};

	like = data => {
		const { user, favs } = this.props;
		addLike({ data: { link: data, ["id-user"]: user.sub } }).then(fav => {
			this.props.addFav({
				id: fav.ID,
				link: data,
				["id-user"]: user.sub
			});
		});
	};

	unlike = id => {
		const { favs } = this.props;
		removeLike(id).then(() => this.props.removeFav(id));
	};

	componentWillMount() {
		let {
			location: { query, feelingLucky },
			location
		} = this.props;
		query = query ? query : this.getQuery(location.search);
		this.setState({ query }, () => this.search(feelingLucky));
	}

	tabChange = tab => {
		this.setState({ tab, searchType: typeMap[tab] }, this.onSearch);
	};

	onChangePage = page => {
		this.setState({ page }, this.onSearch);
	};

	render = () => {
		const { query, results, tab, page } = this.state;
		return (
			<ResultsPage
				onTabChange={this.tabChange}
				tab={tab}
				query={query}
				like={this.like}
				unlike={this.unlike}
				search={this.search}
				results={results}
				page={page}
				onChange={this.onQueryChange}
				onChangePage={this.onChangePage}
				isLoggedIn={this.props.isLoggedIn}
			/>
		);
	};
}

const mapStateToProps = state => ({
	favs: state.fav,
	user: state.auth.user,
	error: state.UI.homePage.error,
	isLoggedIn: state.auth.isLoggedIn
});

export default connect(
	mapStateToProps,
	{ addFav, removeFav }
)(withRouter(ResultsPageContainer));
