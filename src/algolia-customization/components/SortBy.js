import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
import Select from './Select';

/* const cx = createClassNames('SortBy');*/
const cx = createClassNames('SortBy', 'algolia');

class SortBy extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string.isRequired,
            })
        ).isRequired,
        currentRefinement: PropTypes.string.isRequired,
        refine: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: '',
    };

    render() {
        const { items, currentRefinement, refine, className } = this.props;

        return (
            <div className={classNames(cx(''), className)}>
                <Select
                    cx={cx}
                    items={items}
                    selectedItem={currentRefinement}
                    onSelect={refine}
                />
            </div>
        );
    }
}

export default SortBy;
