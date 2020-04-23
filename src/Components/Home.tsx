import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import CovidApiRepository from "../Library/CovidApiRepository";
import StatusComponent from "./StatusComponent";
import { graphHoveredColor, graphColor, sort_by } from "../Constants";
import { useCountries } from "../Context/CountriesContext";
import ListOfCountriesComponent from "./ListOfCountriesComponent";
import NewsComponent from "./NewsComponent";

const mdata = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      data: [],
      backgroundColor: ["#2196f3", "#f44336", "#9e9e9e"],
      hoverBackgroundColor: ["#64b5f6", "#e57373", "#e0e0e0"],
    },
  ],
};

interface dataProps {
  cases: number;
  deaths: number;
  recovered: number;
  updated: number;
  active: number;
  affectedCountries: number;
}
interface mstate {
  raw: any;
  data: dataProps;
  graphData: any;
}
export default function Home() {
  const obj = [
    "recovered",
    "cases",
    "deaths",
    //    "affectedCountries"
  ];
  const [state, setstate] = useState<mstate>();
  const { context, setContext } = useCountries()!;
  useEffect(() => {
    const fetchData = async () => {
      let raw: any = [];
      const data: dataProps = await CovidApiRepository.All();

      obj.forEach((element: any) => {
        const _item: keyof dataProps = element;
        raw = [...raw, data[_item]];
      });

      setstate({
        raw: raw,
        data: data,
        graphData: {
          labels: obj,
          datasets: [
            {
              data: raw,
              backgroundColor: graphColor(),
              hoverBackgroundColor: graphHoveredColor(),
            },
          ],
        },
      });
    };

    fetchData();
  }, []);

  if (!state) return null;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box m={3}>
            <Grid container direction="row" justify="space-around" alignItems="center">
              {obj.map((item: any, key: any) => {
                const _item: keyof dataProps = item;
                return (
                  <Grid item xs={2} key={key}>
                    <StatusComponent background={""} title={item} text={state.data[_item]} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Pie data={state.graphData} />

          <NewsComponent />
        </Grid>

        <Grid item xs={4}>
          <ListOfCountriesComponent />
        </Grid>
      </Grid>
    </>
  );
}
