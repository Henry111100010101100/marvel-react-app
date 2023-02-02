import errorImg from './error.gif';

const ErrorMessage = () => {
    return(
        <img 
        src={errorImg} 
        alt="An error occurred..."
        style={{display: "block", objectFit: "cover", margin: "0 auto", width: "250px"}} />
    )
} 

export default ErrorMessage;