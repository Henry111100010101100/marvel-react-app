import {Helmet} from "react-helmet";

import AppBanner from "..//appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with the list of Marvel's Comics"
                />
                <title>Marvel Comics page</title>
            </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;