import currency from "currency.js";

export const espTransform = (value:number, { precision = 2, showSymbol = true } = {}) => {
    const val = !isNaN(Number(value)) ? Number(value) : value;
  
    return currency(val, {
      precision: precision,
      symbol: showSymbol ? "₹" : "",
      decimal: ".",
      separator: ",",
    });
  }

  export const reducer = (accumulator:any, currentValue:number) => {
    return accumulator + (isNaN(currentValue) ? 0 : currentValue);
  };


  export const commaToDecimal = (value:any) => Number(value.replace(",", "."))

  export const convertToNum = (val:any) => val.toString().includes(",") ? commaToDecimal(val) : Number(val)