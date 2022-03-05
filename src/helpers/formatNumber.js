const formatNumber = (value) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  });
};

export default formatNumber;
