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
    return (
        <div className="algolia-article-result">
            {hit.type === 'PDF' &&
            <span className="pdf-icon"/>}
            <a href={hit.objectID}>
                <Highlight attribute="title" hit={hit} className="title-result"/>
            </a>
            <div className="algolia-content-result">
                <CustomizedSnippet attribute="content" hit={hit}/>
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
                                    showMore={true} limit={3} headerTitle="Pays"/>
                </div>
            </div>

        </div>
        <div className="pagination">
            <Pagination />
        </div>
    </div>
);

export default Results;
