import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const Countrycard = ({ country }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <div className="countryCard">
        {" "}
        {/* Use the countryCard class */}
        <Card sx={{ maxWidth: 345 }}>
          <Box sx={{ padding: "20px" }}>
            <CardMedia
              component="img"
              height="140"
              image={country.flags.png} // Use the flag image URL from API
              alt={`Flag of ${country.name.common}`}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {country.name.common} {/* Display the country's name */}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};

export default Countrycard;
