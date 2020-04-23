export const dateConverter = (date: any) => {
  const d = new Date(date);
  const getMonth = d.getMonth() < 13 ? d.getMonth() + 1 : d.getMonth();
  const month = getMonth.toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

export const recoveredColor = "#2196f3";
export const casesColor = "#f44336";
export const deathColor = "#9e9e9e";

export const recoveredHoveredColor = "#64b5f6";
export const casesHoveredColor = "#e57373";
export const deathHoveredColor = "#e0e0e0";

export const graphColor = () => {
  return [recoveredColor, casesColor, deathColor];
};

export const graphHoveredColor = () => {
  return [recoveredHoveredColor, casesHoveredColor, deathHoveredColor];
};

export const arraymove = (arr: Array<string>, fromIndex: number, toIndex: number) => {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
};
interface sort {
  a: number;
  b: number;
}

export const sort_by = (array: any, key: any) => {
  return array.slice().sort((a: any, b: any) => b[key] - a[key]);
};

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
