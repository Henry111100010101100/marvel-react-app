import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px'}}>Sorry, this page doesn't exist</p>
            <Link style={{'display': 'block', 'marginTop': '40px', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013'}} to="/"> Back to main page </Link>
        </div>
    )
};

export default Page404;
