import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemsLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemsLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error ('Unexpected process state');
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequestLoad(offset, true)
        // eslint-disable-next-line
    }, [])

    const onRequestLoad = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset +8);
        setNewItemsLoading(false);
        setComicsEnded(ended);
    }

    const renderComics = (arr) => {
        const comics = arr.map((item,i) => {
            return (
                <li 
                className="comics__item"
                key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }

/*     const comics = renderComics(comicsList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null; */

    const comicsFinish = comicsEnded ? "No more comics" : null

    return (
        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), newItemsLoading)}
            
            <button 
            className="button button__main button__long"
            disabled={newItemsLoading}
            onClick={() => onRequestLoad(offset)}
            style={{display: comicsEnded ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
            <p style={{textAlign: "center", marginTop: "20px", color: "red", fontSize: "26px"}}>
                {comicsFinish}
            </p>
        </div>
    )
}

export default ComicsList;