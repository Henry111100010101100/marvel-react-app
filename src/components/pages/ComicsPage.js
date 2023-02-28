import AppBanner from "..//appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

export const ComicsPage = () => {
    return(
        <>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}