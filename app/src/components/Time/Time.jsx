import { format } from "date-fns";

const Time = ({ dateString }) => {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};
export default Time;
