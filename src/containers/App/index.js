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
} from 'react-instantsearch-dom';

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

function findTitle(hit) {
    const attrs = ['title1', 'title2', 'title3', 'title4'];
    for (let i = 0; i < attrs.length; ++i) {
        if (
            hit._highlightResult &&
            hit._highlightResult[attrs[i]] &&
            hit._highlightResult[attrs[i]].findIndex(
                e => e.matchLevel !== 'none'
            ) !== -1
        ) {
            return [
                attrs[i],
                hit._highlightResult[attrs[i]].findIndex(
                    e => e.matchLevel !== 'none'
                ),
            ];
        }
    }

    return [null, null];
}

const Hit = ({hit}) => {
    debugger
    return (
        <article>
            <h1>
                <Highlight attribute="title" hit={hit}/>
            </h1>
            <p>
                <Highlight attribute="title1" hit={hit}/>
            </p>
            <p>
                <Highlight attribute="title2" hit={hit}/>
            </p>
            <p>
                <Highlight attribute="title3" hit={hit}/>
            </p>
        </article>
    );

};

let hasDisplayed = false;
const HitsChecker = connectHits(({hits, searchState}) => {
    if (hits.length === 0 && !hasDisplayed) {
        return null;
    } else if (hits.length === 0 && hasDisplayed) {
        return (
            <div className="results flexcontainer-as-column">
                <div className="refinements"/>
                <div className="items">
                    <p>Aucun résultat pour cette recherche.</p>
                    <ClearRefinements
                        clearsQuery
                        translations={{
                            reset: 'Supprimer les filtres',
                        }}
                    />
                </div>
            </div>
        );
    }
    hasDisplayed = true;
    return (
        <div className="wrapper">
            <div className="results">
                <div className="refinements">
                    <Panel title="Catégories">
                        <Menu attributeName="categories_lvl0"/>
                    </Panel>
                    <Panel title="Années">
                        <RefinementList attributeName="year"/>
                    </Panel>
                </div>
                <div className="items  flexcontainer-as-column">
                    <div className="tagList">
                        <Menu attributeName="categories_lvl1"/>
                    </div>
                    <InstantSearch
                        appId="AP1SAU3HM8"
                        apiKey="ca5a4ca0494ad49d12591dc4823ac172"
                        indexName="site2"
                        searchState={searchState}
                    >
                        <Configure
                            hitsPerPage="4"
                            attributesToSnippet={['content:20']}
                        />
                        <VirtualSearch />
                        <VirtualCategory />
                        <VirtualYear />
                        <VirtualLvl1 />
                        <Pdfs />
                    </InstantSearch>
                    <Hits hitComponent={Hit}/>
                    <Pagination />
                </div>
            </div>
        </div>
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
                    <div class="flexcontainer-as-row">
                        <div class="flexcontainer-as-column">
                            <SearchBox
                                translations={{
                                    placeholder: 'Recherchez des pages, documents...',
                                }}
                            />
                            <div id="dyn_nav">
                                <div class="dn-hdr">
                                    <span><b>Filtrer</b></span>
                                </div>
                            </div>
                            <div >
                                <span title="Topic">Topic</span>
                                <Menu attribute="categories_lvl1"/>
                            </div>
                        </div>
                        <div className="wrapper">
                            <Hits hitComponent={Hit} />

                            <div className="pagination">
                                <Pagination />
                            </div>
                        </div>

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
