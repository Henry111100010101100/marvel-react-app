import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 200,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequestLoad()
    }

    onRequestLoad = (offset) => {
        this.onCharListLoading();

        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        });
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderCards = (arr) => {
        const cards = arr.map(item => {
            const nameFontSize = item.name.length > 30 ? {fontSize: "21px"} : null;
            const noAvailableImg = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: "unset"} : null;
            
            return(
                <li 
                className="char__item" 
                key={item.id}
                onClick={() => this.props.onSelectedChar(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={noAvailableImg}/>
                    <div className="char__name" style={nameFontSize}>{item.name}</div>
                </li>
            )
        })

        return(
            <ul className="char__grid">
                {cards}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, newItemsLoading, offset, charEnded} = this.state;
        const cardsList = this.renderCards(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? cardsList : null;

        const CharEnd = charEnded ? "No more characters" : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={() => this.onRequestLoad(offset)}
                    style={{display: charEnded ? "none" : "block"}}>
                        <div className="inner">load more</div>
                </button>
                <p style={{textAlign: "center", marginTop: "20px", color: "red", fontSize: "26px"}}>
                    {CharEnd}
                </p>
            </div>
        )
    }
}

export default CharList;