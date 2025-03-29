import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchAndFilter = ({ searchValue, onSearchChange, selectedRegion, onRegionChange }) => {
  return (
    <div className="controls">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          id="searchInput"
          placeholder="Search for a country..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>

      <select id="regionFilter" value={selectedRegion} onChange={onRegionChange}>
        <option value="" hidden>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
