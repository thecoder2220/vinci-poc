import React, { Component } from 'react';
import { connectMenu } from 'react-instantsearch-core';
import PanelCallbackHandler from '../components/PanelCallbackHandler';
import Menu from '../components/Menu';

class MenuWidget extends Component {
    static propTypes = {};

    state = {
        makeItSearchable: false,
    };

    onClick = () => {
        this.setState({
            makeItSearchable: !this.state.makeItSearchable,
        });
    };

    render() {
        const props = this.props;
        return (
            <PanelCallbackHandler {...props}>
                <ul className="one-category dn-attr-more ">
                    <li className="header-category fake-column">
                        <div
                            className="display-searchable"
                            onClick={this.onClick}
                        />
                        <span
                            className="header-category-txt"
                            title={props.headerTitle}
                        >
                            {props.headerTitle}
                        </span>
                    </li>
                    <Menu {...props} searchable={this.state.makeItSearchable} />
                </ul>
            </PanelCallbackHandler>
        );
    }
}

export default connectMenu(MenuWidget);
