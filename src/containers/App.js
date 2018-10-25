/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    ClearRefinements,
    Configure,
    connectSearchBox,
    connectStateResults,
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
    Snippet,
    Menu,
    Pagination,
    Panel,
    RefinementList,
    Stats,
} from 'react-instantsearch-dom';

import Results from './Results';
import NoResults from './NoResults';

const ResultsOrNoResults = connectStateResults(
    ({ searchState, searchResults }) =>
        searchResults && searchResults.nbHits !== 0 ? (
            <Results />
        ) : (
            <NoResults searchState={searchState}/>
        )
);

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        appID: PropTypes.string,
        apiKey: PropTypes.string,
        meta: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    state = {
        searchState: {},
    };

    handleSearchState = searchState => this.setState({searchState});

    render() {

        return (
            <InstantSearch
                appId="AP1SAU3HM8"
                apiKey="ca5a4ca0494ad49d12591dc4823ac172"
                indexName="site-search"
                onSearchStateChange={this.handleSearchState}
            >
                <div id="container-main-searchbox" className="Grid flex-1">
                    <SearchBox className="fake-column"
                               translations={{
                                   placeholder: '',
                               }}
                    />
                    <i id="magnifier" className="fas fa-search"></i>
                </div>
                <ResultsOrNoResults  />
            </InstantSearch>
        );
    }
}

export default connect(state => ({
    appID: state.appID,
    apiKey: state.apiKey,
    meta: state.meta,
    theme: state.theme,
}))(App);
