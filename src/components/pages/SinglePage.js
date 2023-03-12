import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const {clearError, getComic, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError();

        switch(dataType) {
            case "comic":
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            case "character":
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            default:
                throw new Error ("Unexpected data. Can't find necessary page");
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;