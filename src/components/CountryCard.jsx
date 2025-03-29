import { useNavigate } from "react-router-dom";
import '../style.css';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/country/${encodeURIComponent(country.name.common)}`);
  };

  return (
    <div className="country-card" onClick={goToDetails}>
      <img className="country-flag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <h3 className="country-name">{country.name.common}</h3>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
    </div>
  );
};

export default CountryCard;
