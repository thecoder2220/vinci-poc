/* eslint-disable */
import React, {Component} from 'react';
import {
    connectHits,
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
import CustomizedMenu from '../algolia-customization/widgets/CustomizedMenu';
import CustomizedSortBy from '../algolia-customization/widgets/CustomizedSortBy';
import CustomizedSnippet from '../algolia-customization/widgets/CustomizedSnippet';

const Hit = ({hit}) => {

    console.log('hit', hit)
    return (
        <div className="algolia-article-result">
            {hit.type === 'PDF' &&
            <span className="pdf-icon"/>}
            <a href={hit.objectID}>
                <Highlight attribute="title" hit={hit} className="title-result"/>
            </a>
            <div className="algolia-content-result container-end-horizontal-line">
                <CustomizedSnippet attribute="content" className="grow-1" hit={hit}/>
                <div className="preview-pdf">
                    <img
                        src="/input/www.vinci.com-publi-vinci_energies-vincienergies04s-fr.pdf/page-1.png"
                        alt="Could not generate preview"/>
                </div>
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
                        headerTitle="Année" sortByName={true}/>
    );
});

const Results = () => (
    <div>
        <div id="container-stats-sortby" className="container-end-horizontal-line">
            <div className="grow-1"></div>

            <CustomizedSortBy
                items={[
                    {value: 'site_search_sort_by _date', label: 'Tri par date'},
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
                    }}/>
                    <Hits hitComponent={Hit}/>
                </div>
            </div>
            <div id="ContainerCategories">
                <div className="header-all-categories flex-1 fake-column">
                    <span><b>Filtrer</b></span>
                </div>

                <div id="dyn_nav" className="align-center flex-1 fake-column">
                    <HitsCategories />
                    <YearMenu />
                    <CustomizedMenu attribute="searchCountryFR" className="dn-attr-v"
                                    showMore={true} limit={3} headerTitle="Pays"
                                    showMoreLimit={200}/>
                </div>
            </div>

        </div>
        <div className="pagination">
            <Pagination />
        </div>
    </div>
);

export default Results;
