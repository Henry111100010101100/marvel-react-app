import { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleCharPage = (props) => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    /* useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    } */

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={props.char}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">CharName{name}</h2>
                <p className="single-comic__descr">CharDescr{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main page</Link>
        </div>
    )
}

export default SingleCharPage;