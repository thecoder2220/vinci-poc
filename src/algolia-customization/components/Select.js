/* eslint-disable */

import {has} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

export default class Select extends Component {
    static propTypes = {
        cx: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string,
                disabled: PropTypes.bool,
            })
        ).isRequired,
        selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        separator: PropTypes.node,
    };

    onChange = e => {
        this.props.onSelect(e);
    };

    static defaultProps = {
        rootURL: null,
        separator: '/',
        className: '',
    };

    render() {
        const {cx, items, selectedItem, separator} = this.props;

        const breadcrumb = items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const theClassName= cx(selectedItem=== item.value?'link-selected':'link')
            debugger // eslint-disable-line
            console.log('theClassName='+theClassName)
            return (
                <li
                    key={idx}
                >
                    <Link
                        className={theClassName}
                        onClick={() => this.onChange(item.value)}
                        href="#"
                    >
                        {item.label}
                    </Link>
                    {!isLast &&
                    <span className={cx('separator')}> {separator} </span>
                    }
                </li>
            );
        });

        return (
            <ul className={cx('list') +' flexcontainer-as-row flex-end'} >
                {breadcrumb}
            </ul>
        );
    }
}
