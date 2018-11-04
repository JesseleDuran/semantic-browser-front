import React, { Component } from "react";
import BrowserTitle from "../atoms/BrowserTitle"
import SearchInput from "../molecules/SearchInput"
import Grid from "@material-ui/core/Grid";
import FilledButton from "../atoms/FilledButton";
import ResultList from "../organisms/ResultList";
import NavTab from "../molecules/NavTab";
import Pagination from "../organisms/Pagination"

const data = [
    {
        "kind": "customsearch#result",
        "title": "Essentials of the Java Programming Language, Part 1",
        "htmlTitle": "Essentials of the <b>Java Programming</b> Language, Part 1",
        "link": "https://www.oracle.com/technetwork/java/index-138747.html",
        "displayLink": "www.oracle.com",
        "snippet": "If you are new to programming in the Java language, have some experience with \nother languages, and are familiar with things like displaying text or graphics or ...",
        "htmlSnippet": "If you are new to <b>programming</b> in the <b>Java</b> language, have some experience with <br>\nother languages, and are familiar with things like displaying text or graphics or&nbsp;...",
        "cacheId": "G7u1tM1EFegJ",
        "formattedUrl": "https://www.oracle.com/technetwork/java/index-138747.html",
        "htmlFormattedUrl": "https://www.oracle.com/technetwork/<b>java</b>/index-138747.html",
        "pagemap": {
            "metatags": [
                {
                    "title": "Essentials of the Java Programming Language, Part 1",
                    "country": "USA",
                    "language": "en",
                    "updated date": "8/26/13 4:47 PM"
                }
            ]
        }
    },
    {
        "kind": "customsearch#result",
        "title": "Java (programming language) - Wikipedia",
        "htmlTitle": "<b>Java</b> (<b>programming</b> language) - Wikipedia",
        "link": "https://en.wikipedia.org/wiki/Java_(programming_language)",
        "displayLink": "en.wikipedia.org",
        "snippet": "Java is a general-purpose computer-programming language that is concurrent, \nclass-based, object-oriented, and specifically designed to have as few ...",
        "htmlSnippet": "<b>Java</b> is a general-purpose computer-<b>programming</b> language that is concurrent, <br>\nclass-based, object-oriented, and specifically designed to have as few&nbsp;...",
        "cacheId": "ty8cA0ylPEMJ",
        "formattedUrl": "https://en.wikipedia.org/wiki/Java_(programming_language)",
        "htmlFormattedUrl": "https://en.wikipedia.org/wiki/<b>Java</b>_(<b>programming</b>_language)",
        "pagemap": {
            "cse_thumbnail": [
                {
                    "width": "166",
                    "height": "304",
                    "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTkd-KfsXtxIbwamVrMSuOjYm8ZFHt05veHuXwVV4RF9aF0Yc3FJeFpQw"
                }
            ],
            "metatags": [
                {
                    "referrer": "origin",
                    "og:image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
                }
            ],
            "cse_image": [
                {
                    "src": "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
                }
            ]
        }
    }
]

class ResultsPage extends Component {

    constructor() {
        super();

        // an example array of items to be paged
        var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

	render = () => {
		return (
			<div>
                <Grid container justify="center">
                    <BrowserTitle title={"Google IT"}/>
                </Grid>
                <SearchInput/>
                <FilledButton onClick={() => console.log('oli')}>
			    </FilledButton>
                <NavTab/>
                <ResultList items={data}></ResultList>
                <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
			</div>
		);
	};
}

export default (ResultsPage);
