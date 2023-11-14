
import './card.styles.css'
import {Link} from 'react-router-dom'
const Card = ({ countryData }) => {
  const { code, flagImage, name, continent } = countryData;

  return (
    <div className="cartas">
      <img src={flagImage} 
   style={{ width: '210px', height: '110px' }}
           alt={`Flag of ${name}`} 
           />
       <div className='allDatos' style={{ width: '210px', height: '80px'}}>
       <Link className='nombre' to={`${code}`}>
      <h3>{name}</h3>
      <p>{continent}</p>
      </Link>
      </div>
    </div>
  );
};

export default Card;
