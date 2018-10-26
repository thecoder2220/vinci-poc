/* eslint-disable */
/* eslint-disable prettier/prettier */

import { orderBy } from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchBoxFromMenu from '../components/SearchBoxFromMenu';

const itemsPropType = PropTypes.arrayOf(
    PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.node.isRequired,
        items: (...args) => itemsPropType(...args),
    })
);

class List extends Component {
    static propTypes = {
        cx: PropTypes.func.isRequired,
        // Only required with showMore.
        translate: PropTypes.func,
        items: itemsPropType,
        renderItem: PropTypes.func.isRequired,
        selectItem: PropTypes.func,
        className: PropTypes.string,
        showMore: PropTypes.bool,
        limit: PropTypes.number,
        showMoreLimit: PropTypes.number,
        show: PropTypes.func,
        searchForItems: PropTypes.func,
        searchable: PropTypes.bool,
        isFromSearch: PropTypes.bool,
        canRefine: PropTypes.bool,
        sortByName:PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        isFromSearch: false,
        sortByName:false,
    };

    constructor() {
        super();

        this.state = {
            extended: false,
            query: '',
        };
    }

    onShowMoreClick = () => {
        this.setState(state => ({
            extended: !state.extended,
        }));
    };

    getLimit = () => {
        const {limit, showMoreLimit} = this.props;
        const {extended} = this.state;
        return extended ? showMoreLimit : limit;
    };

    resetQuery = () => {
        this.setState({query: ''});
    };

    renderItem = (item, resetQuery) => {
        const itemHasChildren = item.items && Boolean(item.items.length);

        return (
            <li
                key={item.key || item.label}
                className={this.props.cx(
                    'item',
                    item.isRefined && 'item--selected',
                    item.noRefinement && 'item--noRefinement',
                    itemHasChildren && 'item--parent'
                )}
            >
                {this.props.renderItem(item, resetQuery)}
                {itemHasChildren && (
                    <ul className={this.props.cx('list', 'list--child')}>
                        {item.items.slice(0, this.getLimit()).map(child => this.renderItem(child, item))}
                    </ul>
                )}
            </li>
        );
    };

    renderShowMore() {
        const {showMore, translate, cx} = this.props;
        if (!showMore) {
            return null;
        }

        const {extended} = this.state;
        const disabled = this.props.limit >= this.props.items.length;
        const nbItemsToDisplay = this.props.items.length;
        const countRemainingItems = nbItemsToDisplay > this.props.limit ? nbItemsToDisplay : '';
        if (nbItemsToDisplay <= this.props.limit) {
            return null;
        }
        return (
            <li className="showMore-customized">
                <a><span
                    disabled={disabled}
                    className={cx('showMore-customized', disabled && 'showMore--disabled')}
                    onClick={this.onShowMoreClick}
                >
                        </span>
                    {extended ? (
                        <span  onClick={this.onShowMoreClick}
                            className="showMore-count-customized">{translate('showMore', extended)}</span>
                    ) : (
                        <span onClick={this.onShowMoreClick}
                            className="showMore-count-customized">{countRemainingItems} {translate('showMore', extended)}
                            </span>
                    )}
                </a>
            </li>
        );
    }

    renderSearchBox() {
        const {
            cx,
            searchForItems,
            isFromSearch,
            translate,
            items,
            selectItem,
        } = this.props;

        const noResults =
            items.length === 0 && this.state.query !== '' ? (
                <div className={cx('noResults')}>{translate('noResults')}</div>
            ) : null;
        return (
            <div className={cx('searchBox-from-menu')}>
                <SearchBoxFromMenu
                    currentRefinement={this.state.query}
                    refine={value => {
                        this.setState({query: value});
                        searchForItems(value);
                    }}
                    focusShortcuts={[]}
                    translate={translate}
                    onSubmit={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isFromSearch) {
                            selectItem(items[0], this.resetQuery);
                        }
                    }}
                />
                {noResults}
            </div>
        );
    }

    render() {
        const {cx, className, searchable, canRefine, sortByName} = this.props;
        let {items} = this.props;
        const searchBox = searchable ? this.renderSearchBox() : null;
        const rootClassName = classNames(
            cx('', !canRefine && '-noRefinement'),
            className
        );

        if (sortByName) {
            items =orderBy(
                this.props.items,
                [ 'label' , 'count','isRefined'],
                ['desc', 'desc', 'desc']
            )
        }

        if (items.length === 0) {
            return <div className={rootClassName}>{searchBox}</div>;
        }

        // Always limit the number of items we show on screen, since the actual
        // number of retrieved items might vary with the `maxValuesPerFacet` config
        // option.
        return (
            <div className={rootClassName}>
                    {searchBox}
                <ul className={cx('list', !canRefine && 'list--noRefinement')}>
                    {items.slice(0, this.getLimit()).map(item => this.renderItem(item, this.resetQuery))}
                </ul>
                {this.renderShowMore()}
            </div>
        );
    }
}

export default List;
