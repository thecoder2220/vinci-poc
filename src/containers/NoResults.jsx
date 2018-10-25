/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const NoResults = ({ searchState }) => {

    return (
    <div id="NoResultsBlock" className="flex-1">
        <br/>Les termes de recherche spécifiés - <b>{searchState.query}</b> – ne correspondent à aucun document.
            <br/>Aucune page ne contient <b>"{searchState.query}"</b>.
        <br/><br/>
        Suggestions :
        <ul>
            <li>Vérifiez l’orthographe des termes de recherche.</li>
            <li>Essayez d'autres mots.</li>
            <li>Utilisez des mots plus généraux.</li>
        </ul>
    </div>
    );
};


NoResults.propTypes = {
    searchState: PropTypes.object.isRequired,
};

export default NoResults;


