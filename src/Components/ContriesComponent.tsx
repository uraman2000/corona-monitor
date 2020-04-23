import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import StatusComponent from "./StatusComponent";
import { Grid, Typography, Box, Container, Paper } from "@material-ui/core";
import { dateConverter, graphColor, arraymove } from "../Constants";
import { Line } from "react-chartjs-2";
import CovidApiRepository from "../Library/CovidApiRepository";

const wee = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [20, 59, 80, 81, 56, 55, 20],
    },
    {
      label: "daat",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,

      data: [10, 20, 30, 40, 500, 55, 40],
    },
  ],
};

export default function ContriesComponent() {
  const history = useHistory();
  const state: any = history.location.state;
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await CovidApiRepository.CountryHistory(state.data.country);
      const labels: any = Object.keys(data.timeline.cases);
      console.log(labels);

      const cases = Object.values(data.timeline.cases);
      const deaths = Object.values(data.timeline.deaths);
      const recovered = Object.values(data.timeline.recovered);
      const datasets: any = [];

      let color = arraymove(graphColor(), 0, 2);

      Object.keys(data.timeline).forEach((element: any, key: any) => {
        console.log(graphColor()[key]);
        const values = Object.values(data.timeline[element]);
        datasets.push({
          label: element,
          fill: false,
          lineTension: 0.1,
          backgroundColor: color[key],
          borderColor: color[key],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: color[key],
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: values,
        });
      });

      setData({
        labels: labels,
        datasets: datasets,
      });
    };
    fetchData();
  }, []);

  const obj = [
    "recovered",
    "cases",
    "deaths",
    //    "affectedCountries"
  ];
  const date = dateConverter(state.data.updated);

  return (
    <Box mt={8}>
      <Typography variant="caption" display="block" gutterBottom>
        <Box textAlign="right">
          Updated Last: <i>{date}</i>
        </Box>
      </Typography>
      <Grid container direction="row" justify="space-around" alignItems="center">
        {obj.map((item: any, key: any) => {
          const _item: any = item;
          return (
            <Grid item xs={2}>
              <StatusComponent background={""} title={item} text={state.data[_item]} />
            </Grid>
          );
        })}
      </Grid>

      <Box mt={3}>
        <Paper>
          <Box p={3}>
            <Box mb={3}>
              <Box textAlign="center" fontSize="h4.fontSize">
                Historical Graph
              </Box>
              <Box textAlign="center" fontSize="caption.fontSize" fontStyle="italic">
                *note (the latest updated data is above this is just for graph presentation)
              </Box>
            </Box>

            <Line data={data} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
