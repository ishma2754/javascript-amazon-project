//utility file
//use this function for any amount priceCents
export function formatCurrency(priceCents){
  return (priceCents / 100).toFixed(2);
}

export default formatCurrency;// import the file without curly brackets but only when importing one file