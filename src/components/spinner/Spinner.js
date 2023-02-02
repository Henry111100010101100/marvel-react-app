import spinner from './spinner.gif'

const Spinner = () => {
    return(
            <img src={spinner}
             alt="Loading..."
             style={{display: "block", margin: "0 auto", width: "80px"}} />
    )
}

export default Spinner;