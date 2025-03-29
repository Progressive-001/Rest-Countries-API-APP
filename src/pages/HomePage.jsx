import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSearch } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [region, setRegion] = useState("");
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
    const navigate = useNavigate();

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => setCountries(data));
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase()) &&
        (region ? country.region === region : true)
    );

    return (
        <>
            <header>
                <h1>Where in the world?</h1>
                <button id="toggleTheme" onClick={() => setDarkMode(prev => !prev)}>
                    <FontAwesomeIcon icon={faMoon} className="toggle-icon" />
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </header>

            <div className="controls">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </div>

                <select value={region} onChange={e => setRegion(e.target.value)}>
                    <option value="" hidden>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>

            <div className="countriesContainer">
                {filteredCountries.map(country => (
                    <div key={country.cca3} className="country-card" onClick={() => navigate(`/country/${country.name.common}`)}>
                        <img className="country-flag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                        <h3 className="country-name">{country.name.common}</h3>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;
