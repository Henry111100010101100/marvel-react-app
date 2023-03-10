import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const Page404 = () => {
    return(
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Page with Error 404"
                />
                <title>Error 404: Page not found</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px'}}>Sorry, this page doesn't exist</p>
            <Link style={{'display': 'block', 'marginTop': '40px', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013'}} to="/"> Back to main page </Link>
        </div>
    )
};

export default Page404;
