/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
import Link from './Link';

/* const cx = createClassNames('SortBy');*/
const cx = createClassNames('SortBy', 'algolia');

class SortBy extends Component {

    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string,
                disabled: PropTypes.bool,
            })
        ).isRequired,
        separator: PropTypes.node,
        currentRefinement: PropTypes.string.isRequired,
        refine: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    onChange = e => {
        this.props.refine(e);
    };

    static defaultProps = {
        rootURL: null,
        separator: '/',
        className: '',
    };

     render() {
        const { items,  currentRefinement, refine, className, separator } = this.props;

         const containerLinks = items.map((item, idx) => {
             const isLast = idx === items.length - 1;
             const theClassName= cx(currentRefinement=== item.value?'link-selected':'link')
             return (
                 <div
                     key={idx}
                 >
                     <Link
                         //className={theClassName + ' flex-auto'}
                         className={theClassName}
                         onClick={() => this.onChange(item.value)}
                         href="#"
                     >
                         {item.label}
                     </Link>
                     {!isLast &&
                     <span className={cx('separator')}> {separator}</span>
                     }
                 </div>
             );
         });

        return (
            <div className={'grid-no-wrap'}>
                {containerLinks}
            </div>
        );
    }
}

export default SortBy;
