import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    fetchCountry();
  }, [name]);

  const fetchCountry = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
      const data = await response.json();
      const countryData = data[0];
      setCountry(countryData);

      if (countryData.borders) {
        const allResponse = await fetch("https://restcountries.com/v3.1/all");
        const allData = await allResponse.json();
        const borderNames = countryData.borders.map((border) => {
          const borderCountry = allData.find((c) => c.cca3 === border);
          return borderCountry ? borderCountry.name.common : null;
        }).filter(Boolean);
        setBorders(borderNames);
      } else {
        setBorders([]);
      }

    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  if (!country) return <p>Loading...</p>;

  return (
    <>
      <Header />

      <div id="countryDetails" className="countryDetails">

        <button className="backButton" onClick={() => navigate("/")}>← Back</button>

        <div className="countryDetails-1">

          <div className="countryFlagContainer">
            <img id="countryFlag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
          </div>

          <div id="countryDetails-2" className="countryContainer">
            <h2>{country.name.common}</h2>
            <div className="countryCombine">
              <div className="countryDetail-1">
                <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Sub Region:</strong> {country.subregion || "N/A"}</p>
                <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
              </div>
              <div className="countryDetail-2">
                <p><strong>Top Level Domain:</strong> {country.tld ? country.tld.join(", ") : "N/A"}</p>
                <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}</p>
                <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
              </div>
            </div>
            <p className="border"><strong>Border Countries:</strong> {" "}
              {borders.length > 0
                ? borders.map((b, i) => (
                    <button key={i} onClick={() => navigate(`/country/${encodeURIComponent(b)}`)} className="border-link">{b}</button>
                  ))
                : "None"}
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default CountryDetails;
