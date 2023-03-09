import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage  } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import "./searchChar.scss";

const SearchChar = () => {

    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        console.log(char)
    }
    
    const findChar = (charName) => {
        console.log(charName);
        clearError();

        getCharacterByName(charName)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null 
    
    const checkResults = !char ? null :
    char.length > 0 ? 
    <div className="char__search-wrapper">
        <div className="char__search-success">
        Found it! Go to {char[0].name} page?
        </div>
        <Link to={`/characters/${char[0].id}`}  className="button button__secondary">
            <div className="inner">to page</div>
        </Link>
    </div> 
    :
    <div className="char__search-error">
        The character was not found. Check the name and try again, please
    </div>


    return(
        <div className="char__search-form">
            <Formik
            initialValues={{charName: ''}}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .required("This field is required")
            })}
            onSubmit={({charName}) => {findChar(charName)}}>
                <Form>
                    <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                        id="charName"
                        name="charName"
                        type="text"
                        placeholder="Enter name"
                        />

                        <button
                        type="submit"
                        className="button button__main"
                        disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    {<FormikErrorMessage className="char__search-error" name="charName" component="div"/>}
                </Form>
            </Formik>
            {errorMessage}
            {checkResults}
        </div>
    )
} 

export default SearchChar;