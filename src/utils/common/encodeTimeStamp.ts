const encodeTimeStamp = (date: string) => {
  const splitedDate = date.split('.');
  const day = Number(splitedDate[0]);
  const month = Number(splitedDate[1]) - 1;
  const year = Number(splitedDate[2]);
  const fullDate = new Date(year, month, day);
  return fullDate.getTime();
};
export default encodeTimeStamp;
