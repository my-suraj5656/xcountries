import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Countrycard from "./Countrycard";
import { Typography } from "@mui/material";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // For storing search term

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Initially display all countries
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredCountries(countries); // Show all countries if search term is empty
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "150px" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <Grid container spacing={3}>
        {filteredCountries.length === 0 ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography>No countries found</Typography>
          </Box>
        ) : (
          filteredCountries.map((country) => (
            <Countrycard key={country.cca3} country={country} />
          ))
        )}
      </Grid>
    </Box>
  );
};

export default CountryList;
