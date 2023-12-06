import { DATE_TYPE } from '@/constants';

const decodeTimeStamp = (
  timeStamp: number,
  type: DATE_TYPE = DATE_TYPE.DATE
) => {
  const fullDate = new Date(timeStamp);
  const day =
    fullDate.getDate() > 9 ? fullDate.getDate() : `0${fullDate.getDate()}`;
  const month =
    fullDate.getMonth() + 1 > 9
      ? fullDate.getMonth() + 1
      : `0${fullDate.getMonth() + 1}`;
  const year = fullDate.getFullYear();
  const hour =
    fullDate.getHours() > 9 ? fullDate.getHours() : `0${fullDate.getHours()}`;
  const minute =
    fullDate.getMinutes() > 9
      ? fullDate.getMinutes()
      : `0${fullDate.getMinutes()}`;
  const second =
    fullDate.getSeconds() > 9
      ? fullDate.getSeconds()
      : `0${fullDate.getSeconds()}`;

  switch (type) {
    case DATE_TYPE.DATE: {
      return `${day}.${month}.${year}`;
    }
    case DATE_TYPE.TIME: {
      return `${hour}:${minute}:${second}`;
    }
    case DATE_TYPE.DATE_TIME: {
      return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
    }
  }
};

export default decodeTimeStamp;
