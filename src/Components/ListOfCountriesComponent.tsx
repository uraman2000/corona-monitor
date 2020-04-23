import React from "react";
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, CardMedia } from "@material-ui/core";
import { useCountries } from "../Context/CountriesContext";
import { sort_by, numberWithCommas } from "../Constants";

export default function ListOfCountriesComponent() {
  const { context, setContext } = useCountries()!;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Country</TableCell>
          <TableCell align="right">Recovered</TableCell>
          <TableCell align="right">Cases</TableCell>
          <TableCell align="right">Deaths</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sort_by(context, "cases").map((row: any) => (
          <TableRow key={row.country}>
            <TableCell>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <CardMedia
                    style={{
                      height: "1.3em",
                      width: "1.3em",
                      backgroundSize: "contain",
                      marginRight: 3,
                    }}
                    image={row.countryInfo.flag}
                  />
                </Grid>
                <Grid item> {row.country}</Grid>
              </Grid>
            </TableCell>
            <TableCell align="right">{numberWithCommas(row.recovered)}</TableCell>
            <TableCell align="right">{numberWithCommas(row.cases)}</TableCell>
            <TableCell align="right">{numberWithCommas(row.deaths)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
