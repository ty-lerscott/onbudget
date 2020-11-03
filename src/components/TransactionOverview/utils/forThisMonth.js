import isSameMonth from "date-fns/isSameMonth";

export default (arr = [], month) =>
  !arr.length
    ? 0
    : arr.reduce((acc, item) => {
        if (isSameMonth(new Date(item.date), month)) {
          acc += item.amount;
        }

        return acc;
      }, 0);
