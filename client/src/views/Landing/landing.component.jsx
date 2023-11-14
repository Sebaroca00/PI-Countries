import { Link } from "react-router-dom";
import './landing.styles.css'

const Landing = () => {
    return (
        <div>
            <div className="fondo"></div>
            <div className="overlay"></div>
            <div className="centered">
                <h1 className="texto">Bienvenidos a mi Proyecto Individual</h1>
                <Link to="/home" className="button">Ingresar</Link>
            </div>
        </div>
    );
};

export default Landing;
