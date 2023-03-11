import { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const setContent = (process, Component, newItemsLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemsLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error ('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);
    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequestLoad(offset, true);
    }, [])

    const onRequestLoad = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const cardRefs = useRef([]);

    const onFocusCard = (id) => {
        cardRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        cardRefs.current[id].classList.add('char__item_selected');
        cardRefs.current[id].focus();
    }

    const renderCards = (arr) => {
        const cards = arr.map((item, i) => {
            const charNameFontSize = item.name.length > 30 ? { fontSize: "21px" } : null;
            const noAvailableImg = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? { objectFit: "unset" } : null;
            return (
                <CSSTransition 
                timeout={500} 
                key={item.id}
                classNames="char__item">
                    <li
                        className="char__item"
                        tabIndex={0}
                        ref={el => cardRefs.current[i] = el}
                        onClick={() => {
                            props.onSelectedChar(item.id);
                            onFocusCard(i);
                        }}
                        onKeyDown={(e) => {
                            if (e.code === "Enter") {
                                props.onSelectedChar(item.id);
                                onFocusCard(i);
                            }
                        }}>
                        <img src={item.thumbnail} alt={item.name} style={noAvailableImg} />
                        <div className="char__name" style={charNameFontSize}>{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {cards}
                </TransitionGroup>
            </ul>
        )
    }

    /* const cardsList = renderCards(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null; */

    const сharFinish = charEnded ? "No more characters" : null;

    return (
        <div className="char__list">
            {setContent(process, () => renderCards(charList), newItemsLoading)}

            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequestLoad(offset)}
                style={{ display: charEnded ? "none" : "block" }}>
                <div className="inner">load more</div>
            </button>
            <p style={{ textAlign: "center", marginTop: "20px", color: "red", fontSize: "26px" }}>
                {сharFinish}
            </p>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;