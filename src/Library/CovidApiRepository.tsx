import { baseUrl } from ".";
import axios from "axios";

export default class CovidApiRepository {
  public static async All() {
    try {
      const response = await axios.get(`${baseUrl}/all`);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  public static async Countries() {
    try {
      const response = await axios.get(`${baseUrl}/countries?sort=country`);

      return response.data.reverse();
    } catch (error) {
      return error.response.data;
    }
  }

  public static async CountryHistory(country: string) {
    try {
      const response = await axios.get(`${baseUrl}/v2/historical/${country}`);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  public static async News() {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=COVID&from=2020-03-16&sortBy=publishedAt&language=en`,
        {
          headers: {
            "X-Api-Key": "1d08f44d7f004d3fa1b3a85ec3fa7c0b",
          },
        }
      );

      return response.data.articles;
    } catch (error) {
      return error.response.data;
    }
  }
}
