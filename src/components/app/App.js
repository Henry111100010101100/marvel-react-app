import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onSelectedChar = (id) => {
        setChar(id)
    }

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onSelectedChar={onSelectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo chardId={selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/> */}
                    <ErrorBoundary>
                        <ComicsList/>
                    </ErrorBoundary>
                </main>
            </div>
        )
}

export default App;