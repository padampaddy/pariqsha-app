import currency from "currency.js";

export const espTransform = (
  value: any,
  { precision = 2, showSymbol = true } = {}
) => {
  const val = !isNaN(Number(value)) ? Number(value) : value;
  return currency(val, {
    precision: precision,
    symbol: showSymbol ? "₹" : "",
    decimal: ".",
    separator: ",",
  });
};

export const rupTransform = (  value: number) =>{
    const values=value.toString();
    let lastThree = values.substring(values.length-3);
    const otherNumbers = values.substring(0,values.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
  }


// export const reducer = (accumulator: any, currentValue: number) => {
//   return accumulator + (isNaN(currentValue) ? 0 : currentValue);
// };

// export const commaToDecimal = (value: any) => Number(value.replace(",", "."));

// export const convertToNum = (val: any) =>
//   val.toString().includes(",") ? commaToDecimal(val) : Number(val);
