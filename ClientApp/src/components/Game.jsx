import { useEffect, useState } from "react";
import Swal from 'sweetalert2';


const Game = () => {

    // contro fetcht cantidad
    const [isFetch, setIsFetch] = useState(true);

    // cantidad de juegos 
    const [ganados, setGanados] = useState(0);

    // cantidad de juegos 
    const [nPregutas, setNpregutas] = useState(1);

    // input dinamicos 
    const [caracter, setCaracter] = useState([])

    // cantidad de espacios
    const [espacios, setEspacios] = useState(0);

    // cantidad de intentos 8
    const [intentos, setIntentos] = useState(0);

    // gano
    const [iSWiner, setISWiner] = useState(false);
    
      
    // juego actual
    const [actual, setActual] = useState({});

    // fallo pasa automaticamente al siguiente reto 
    const siguiente = () => {
        setCaracter(null);
        setActual({});
        setIntentos(0);
        setEspacios(0);
        setNpregutas(nPregutas + 1);
        setISWiner(false);
        setIsFetch(true);
    }


    const getRandom = (min, max) => {
        return parseInt(Math.floor(Math.random() * (max - min)) + min);
    }

    // fetch de cantidad total de juego como limite 
    const fetchCantida = async (callback) => {
        const response = await fetch('juego');
        console.log(response);
        const data = await response.json();
        callback(data.length)
    };

    const EvaluarFrase = () => {
        const arryFraseJuego = [];

        caracter.forEach(element => {
            arryFraseJuego.push(typeof element !== "object" ? element : " ");
        })

        const valid = arryFraseJuego.join().replace(/,/g, '');
        console.log(valid);
        return actual.palabra.toUpperCase() === valid.toUpperCase();
    }

    const generarInput = (data) => {
        console.log("generar input");
        const datos = [];
        let contador = 0
        data.palabra.split('').forEach((element, index) => {
            if (element === " ") {
                contador++;
                setEspacios(contador)
            }
            datos.push({letra:""})
        })
        setCaracter(datos);
    }

    // fetch juego actual
    const fetchActual = async cant => {
        const response = await fetch(`juego/${getRandom(1, cant)}`);
        console.log(response);
        const data = await response.json();

        generarInput(data);
        setTimeout(() => {
            setActual(data);
        }, 2000);
    };


    const handleChange = (e) => {
        let regex = new RegExp("^[ñÑíóáéú a-zA-Z ]+$");
        if (!regex.test(e.target.value.toUpperCase()) && e.target.value !== "") {
            Swal.fire({
                title: 'Error!',
                text: 'No Se permiten Numeros',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        } else {
            caracter[e.target.id] = e.target.value;
            setCaracter([...caracter]);

            if (EvaluarFrase()) {
                setISWiner(true);
                Swal.fire({
                    title: 'Perfecto!',
                    text: 'Frase Correcta',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })
            }

            if (!actual.palabra.toUpperCase().includes(e.target.value.toUpperCase()) && intentos <= 8)
            {
                setIntentos(intentos+1)
            }

            if (intentos === 8) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Has Fallado Continua con el siguiente reto',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
                siguiente();
            }
        }
    }


    const gano_siguiente = () => {
        siguiente();
        setGanados(ganados + 1);
    }


    const terminar = () => {
        let frase = {
            title: 'Mal!',
            text: 'Tus resultados Fureron malos intenta mejorar',
            icon: 'info',
            confirmButtonText: 'Cerrar'
        };
        switch (ganados) {
            
            case 2:

                frase.title = "Muy Bien!"
                frase.text = "Tus resultados Fureron Buenos";
                frase.icon = "warning"
                break
            case 3:
                frase.title = "Muy Bien!"
                frase.text = "Tus resultados Fureron Buenos";
                frase.icon = "warning"
                break
            case 4:
                frase.title = "Muy Bien!"
                frase.text = "Tus resultados Fureron Exelentes";
                frase.icon = "success"
                break
            case 5:
                frase.title = "Muy Bien!"
                frase.text = "Tus resultados Fureron Exelentes";
                frase.icon = "success"
                break

            default:
               
                break
        }
        Swal.fire(frase);
  
        siguiente();
        setGanados(0)
        setNpregutas(1);
    }


    useEffect(() => {
        if (isFetch) {
            let cant = 0;
            const callback = (num) => {
                cant = num === 0 ? 1 : num;
            }
            console.log("pidiendo cantidad");
            fetchCantida(callback);
            console.log("pidiendo actual");
            setTimeout(() => {
                fetchActual(cant);
            },2000)
            setIsFetch(false);
        }
    }, [isFetch])

    return (
        <div className="d-flex flex-column alig-items-center justify-content-between contenedor">
            <div>
                <p>{`Cantidad de preguntas ${nPregutas}/5`}</p>
                <p>{`Cantidad de intentos ${intentos}/${8}`}</p>
                <p>{`Cantidad de espacio en blanco ${espacios}`}</p>
            </div>
            <div className="d-flex flex-row justify-content-center alig-items-center">
                {
                    !isFetch && actual.hasOwnProperty("palabra") ?
                        <div>
                            <p>{actual.historia}</p>
                            <div className="d-flex flex-row justify-content-center alig-items-center">
                                {actual.palabra.split('').map((element, index) => {
                                    return <input className="form-control input-w m-3" type="text" pattern="[A-Za-z ]" id={index} key={index} name="letra" value={caracter[index].letra} onChange={handleChange} maxLength="1" />
                                })}
                            </div>
                        </div>:
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                }

            </div>

            <div>
                <img src={process.env.PUBLIC_URL + `/${intentos || 0}.png`} alt="orcado" height="260px" />
            </div>

            <div>
                <button type="button" className={iSWiner ? "btn btn-danger" : "btn btn-outline-dark"} onClick={() => {
                    if (nPregutas === 5) {
                        terminar();
                        setISWiner(false);
                    }else if (iSWiner && nPregutas <= 5) {
                        gano_siguiente();
                    }

                }} disabled={!iSWiner} >{nPregutas === 2 ? "Terminar" : "Siguiente"}</button>
            </div>
        </div>
    )
}



export default Game
