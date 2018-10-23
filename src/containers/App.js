/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    ClearRefinements,
    Configure,
    connectSearchBox,
    connectMenu,
    connectHits,
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

import CustomizedMenu from '../algolia-customization/widgets/CustomizedMenu';
import CustomizedSortBy from '../algolia-customization/widgets/CustomizedSortBy';

import './style.scss';

const Hit = ({hit}) => {
    return (
        <div className="algolia-article-result">
            {hit.type === 'PDF' &&
            <span className="pdf-icon"/>}
            <a href={hit.objectID}>
                <Highlight attribute="title" hit={hit} className="title-result"/>
            </a>
            <div className="algolia-content-result">
                <Snippet attribute="content" hit={hit}/>
                <span><font color="#706F6F" size="-1">2018-02-02</font></span>
            </div>
        </div>
    );

};

const HitsCategories = connectHits(({hits}) => {
    if (hits.length === 0) {
        return null;
    }
    return (
        <CustomizedMenu attribute="categories_lvl0" className="flexcontainer-as-column"
                        showMore={true} limit={3} headerTitle="Rubrique"/>
    );
});

const YearMenu = connectHits(({hits}) => {
    if (hits.length === 0) {
        return null;
    }
    return (
        <CustomizedMenu attribute="searchYear" className="dn-attr-v" showMore={true} limit={3}
                        headerTitle="Année"/>
    );
});

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
                <div id="container-stats-sortby" className="container-end-horizontal-line">
                    <div className="grow-1" ></div>

                    <CustomizedSortBy
                        items={[
                            {value: 'site_search_sort_by_date', label: 'Tri par date'},
                            {value: 'site-search', label: 'Tri par pertinence'},
                        ]}
                        defaultRefinement="site-search"
                    />
                </div>
                <div id="ContainerHitsAndCategories">
                    <div className="flexcontainer-as-column">
                        <div className="hits-wrapper wrapper">
                            <Stats translations={{
                                stats (n) {
                                    return `${n.toLocaleString()} résultats`
                                }
                            }} />
                            <Hits hitComponent={Hit}/>
                        </div>
                    </div>
                    <div id="ContainerCategories">
                        <div className="header-all-categories flex-1 fake-column">
                            <span><b>Filtrer</b></span>
                        </div>

                        <div id="dyn_nav" className="align-center flex-1 fake-column">
                            <HitsCategories searchState={this.state.searchState}/>
                            <YearMenu />
                            <CustomizedMenu attribute="country" className="dn-attr-v"
                                            showMore={true} limit={3} headerTitle="Pays"/>
                        </div>
                    </div>

                </div>
                <div className="pagination">
                    <Pagination />
                </div>
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
