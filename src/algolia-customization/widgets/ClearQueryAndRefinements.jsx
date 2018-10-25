import React from 'react';
import {
    connectCurrentRefinements,
    connectSearchBox,
} from 'react-instantsearch-dom';

const ClearQuery = ({ refine }) => {
    const onClick = ev => {
        refine('');
        ev.stopPropagation();
    };
    return (
        <div onClick={onClick}>
            <ConnectedClearAllRefinements />
        </div>
    );
};

const ClearAllRefinements = ({ refine, items }) => {
    const onClick = () => refine(items);
    return <button onClick={onClick}>ClearAll</button>;
};

const ClearQueryAndRefinements = connectSearchBox(ClearQuery);
const ConnectedClearAllRefinements = connectCurrentRefinements(
    ClearAllRefinements
);

export default ClearQueryAndRefinements;
