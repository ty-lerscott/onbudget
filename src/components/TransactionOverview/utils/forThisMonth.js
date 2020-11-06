import isSameMonth from "date-fns/isSameMonth";

const forThisMonth = (arr = [], month) =>
  !arr.length
    ? 0
    : arr.reduce((acc, item) => {
        if (isSameMonth(new Date(item.date), month)) {
          acc += item.amount;
        }

        return acc;
      }, 0);

export default forThisMonth;
