import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Countrycard = ({ country }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2} key={country.abbr}>
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ padding: "20px" }}>
          <CardMedia
            component="img"
            height="140"
            image={country.flag}
            alt={`Flag of ${country.name}`}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {country.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

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
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Countrycard key={country.abbr} country={country} />
        ))}
      </Grid>
    </Box>
  );
};

export default CountryList;
