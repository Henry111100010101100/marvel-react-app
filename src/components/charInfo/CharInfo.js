import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if(!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;
    const noAvailableImg = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: "contain"} : null;
    const noComics = comics.length === 0 ? "No available comics with this character" : null;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={noAvailableImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {noComics}
                {   comics.map((item, i) => {
                        if (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;