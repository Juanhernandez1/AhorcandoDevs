import { useHistory } from "react-router-dom";


function Home() {   
    let history = useHistory();

    function handleClick() {
        history.push("/Juego");
    }

    return (
        <div>
            <div className="d-flex flex-row justify-content-center alig-items-center">
                <h1 className="title-game" > Bienvenido a Ahorcando Dev</h1>
            </div>
            <div className="mt-5 d-flex flex-row justify-content-center alig-items-center">
                <div className="mt-2 d-flex flex-column justify-content-center alig-items-center">
                    <p>Algunos Desarolladores an cometido errores o tiene dudas intenta ayudarles</p>
                    <div className="mt-3 d-flex flex-row justify-content-center alig-items-center">
                         <button type="button" className="btn btn-outline-dark btn-jugar" onClick={() => { handleClick() }}>Jugar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;