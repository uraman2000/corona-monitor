import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { numberWithCommas } from "../Constants";

interface props {
  text: string | number;
  title: string;
  background?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    height: 150,
    width: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function StatusComponent({ title, text, background }: props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root} style={{ backgroundColor: background }}>
      <Typography variant="h6" gutterBottom>
        {title
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toLocaleUpperCase()}
      </Typography>
      {numberWithCommas(text)}
    </Paper>
  );
}
