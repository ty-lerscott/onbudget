import isSameMonth from "date-fns/isSameMonth";

const round = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

export default (arr = [], month) =>
  !arr.length
    ? 0
    : round(
        arr.reduce((acc, item) => {
          if (isSameMonth(new Date(item.date), month)) {
            acc += item.amount;
          }

          return acc;
        }, 0)
      );
