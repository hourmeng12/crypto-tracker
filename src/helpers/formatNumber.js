const formatNumber = (value = 0) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  });
};

export default formatNumber;
