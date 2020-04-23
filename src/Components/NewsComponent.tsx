import React, { useState, useEffect } from "react";
import CovidApiRepository from "../Library/CovidApiRepository";
import { Paper, CardMedia } from "@material-ui/core";

export default function NewsComponent() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await CovidApiRepository.News();
      console.log(data);
      setstate(data);
    };
    fetchData();
  }, []);

  if (!state) return null;
  const articles = () => {};
  return (
    <div>
      {state.map((item: any, key: any) => {
        return (
          <Paper key={key}>
            <CardMedia
              style={{
                height: "150px",
                width: "150px",
                backgroundSize: "contain",
                marginRight: 3,
              }}
              image={item.urlToImage}
            />
          </Paper>
        );
      })}
    </div>
  );
}
