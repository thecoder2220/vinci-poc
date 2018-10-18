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

const PdfHit = ({hit}) => (
    <div className="pdf-hit" onClick={() => (window.location = hit.objectID)}>
        <div className="icon">
            <svg
                className="icon icon-plain-text"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="28"
                viewBox="0 0 24 28"
                aria-hidden="true"
            >
                <path
                    d="M22.937 7.438c.156.156.297.344.438.562H16V.625a3.3 3.3 0 0 1 .562.438zM15.5 10H24v16.5a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 26.5v-25A1.5 1.5 0 0 1 1.5 0H14v8.5a1.5 1.5 0 0 0 1.5 1.5zM18 21.5v-1c0-.281-.219-.5-.5-.5h-11c-.281 0-.5.219-.5.5v1c0 .281.219.5.5.5h11c.281 0 .5-.219.5-.5zm0-4v-1c0-.281-.219-.5-.5-.5h-11c-.281 0-.5.219-.5.5v1c0 .281.219.5.5.5h11c.281 0 .5-.219.5-.5zm0-4v-1c0-.281-.219-.5-.5-.5h-11c-.281 0-.5.219-.5.5v1c0 .281.219.5.5.5h11c.281 0 .5-.219.5-.5z"/>
            </svg>
        </div>
        <div className="hit-content">
            <div className="pdf-hit__title">
                {hit.title ? (
                    <Highlight attributeName="pdfTitle" hit={hit}/>
                ) : (
                    'Document'
                )}
            </div>
            <div className="pdf-hit__content">
                <Snippet attributeName="content" hit={hit}/>
            </div>
        </div>
    </div>
);

const VirtualSearch = connectSearchBox(() => null);
const VirtualMenu = connectMenu(() => null);
const Pdfs = () => <VirtualMenu attributeName="type" defaultRefinement="pdf"/>;

const VirtualCategory = () => <VirtualMenu attributeName="categories_lvl0"/>;
const VirtualLvl1 = () => <VirtualMenu attributeName="categories_lvl1"/>;
const VirtualYear = () => <VirtualMenu attributeName="year"/>;

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
        <CustomizedMenu attribute="year" className="dn-attr-v" showMore={true} limit={3}
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
            <div>
                <InstantSearch
                    appId="AP1SAU3HM8"
                    apiKey="ca5a4ca0494ad49d12591dc4823ac172"
                    indexName="site2"
                    onSearchStateChange={this.handleSearchState}
                >
                    <div id="container-main-searchbox" className="Grid">
                        <SearchBox className="smallitem fake-column"
                                   translations={{
                                       placeholder: '',
                                   }}
                        />
                        <div className="bigitem text-align-left">
                            <Stats translations={{
                                stats (n) {
                                    return `${n.toLocaleString()} résultats`
                                }
                            }}/>
                        </div>
                        <div className="bigitem"/>
                    </div>
                    <div className="flexcontainer-as-row-reverse align-center">
                        <div className="smallitem fontsize18">
                            <CustomizedSortBy
                                items={[
                                    {value: 'site2_sort_by_date', label: 'Tri par date'},
                                    {value: 'site2', label: 'Tri par pertinence'},
                                ]}
                                defaultRefinement="site2"
                            />

                        </div>
                        <div className="bigitem"/>
                    </div>

                    <div className="flexcontainer-as-row">
                        <div className="flexcontainer-as-column">
                            <div className="dn-hdr smallitem fake-column">
                                <span><b>Filtrer</b></span>
                            </div>

                            <div id="dyn_nav" className="align-center smallitem fake-column">
                                <HitsCategories searchState={this.state.searchState}/>
                                <YearMenu />
                                <CustomizedMenu attribute="country" className="dn-attr-v"
                                                showMore={true} limit={3} headerTitle="Pays"/>
                            </div>
                        </div>
                        <div className="flexcontainer-as-column">
                            <div className="hits-wrapper wrapper">
                                <Hits hitComponent={Hit}/>
                            </div>
                        </div>
                    </div>
                    <div className="pagination">
                        <Pagination />
                    </div>
                </InstantSearch>
            </div>
        );
    }
}

export default connect(state => ({
    appID: state.appID,
    apiKey: state.apiKey,
    meta: state.meta,
    theme: state.theme,
}))(App);
