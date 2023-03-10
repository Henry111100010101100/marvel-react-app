import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
    const {name, descr, thumbnail} = data;

    return(
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content="Page with the description about the found character"
                />
                <title>{name}'s Page</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main</Link>
        </div>
    )
}

export default SingleCharacterLayout;