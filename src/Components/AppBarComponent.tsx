import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { RouteChildrenProps, useHistory } from "react-router-dom";
import { Box, TextField, Container, InputAdornment, Link } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CovidApiRepository from "../Library/CovidApiRepository";
import { sort_by } from "../Constants";
import { useCountries } from "../Context/CountriesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  notchedOutline: {
    border: "none",
    color: "inherit",
  },
  searchField: {
    marginTop: 0,
    marginBottom: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
interface IProps {
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
}

export default function AppBarComponent({ children }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  const { context, setContext } = useCountries()!;

  // const useTheme = () => React.useContext(CountriesContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CovidApiRepository.Countries();
      setContext(data);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/" color="inherit">
              Corona Monitor
            </Link>
          </Typography>

          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            /> */}

            {!context ? null : (
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={context.map((item: any) => item.country)}
                onChange={(e: any, value: any) => {
                  if (value !== null) {
                    history.push({
                      pathname: `/country/${value}`,
                      state: { data: context.find((item: any) => item.country === value) },
                    });
                  }
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    placeholder="Search…"
                    margin="normal"
                    variant="outlined"
                    className={classes.searchField}
                    InputProps={{
                      ...params.InputProps,
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      className: classes.notchedOutline,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className="wraper">
        <Container>
          {/* {sort_by(data, "cases")} */}
          <Box mt={12}>{children}</Box>
        </Container>
      </div>
    </div>
  );
}
