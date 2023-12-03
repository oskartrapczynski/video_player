import { DATE_TYPE } from '@/constants';

const decodeTimeStamp = (
  timeStamp: number,
  type: DATE_TYPE = DATE_TYPE.DATE
) => {
  const fullDate = new Date(timeStamp);
  switch (type) {
    case DATE_TYPE.DATE: {
      return `${
        fullDate.getDate() > 9 ? fullDate.getDate() : `0${fullDate.getDate()}`
      }.${
        fullDate.getMonth() > 9
          ? fullDate.getMonth()
          : `0${fullDate.getMonth()}`
      }.${fullDate.getFullYear()}`;
    }
    case DATE_TYPE.TIME: {
      return `${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`;
    }
    case DATE_TYPE.DATE_TIME: {
      return `${
        fullDate.getDate() > 9 ? fullDate.getDate() : `0${fullDate.getDate()}`
      }.${
        fullDate.getMonth() > 9
          ? fullDate.getMonth()
          : `0${fullDate.getMonth()}`
      }.${fullDate.getFullYear()} ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`;
    }
  }
};

export default decodeTimeStamp;
