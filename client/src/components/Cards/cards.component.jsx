import Card from "../Card/card.component";
import './cards.styles.css';

function Cards({ countriesInCurrentPage }) {
  return (
    <div className="card-List">
      {countriesInCurrentPage.map((country) => (
        <Card key={country.code} countryData={country} />
      ))}
    </div>
  );
}

export default Cards;