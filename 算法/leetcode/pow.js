var myPow = function(x, n) {
  if (n == 0) {
      return 1;
  }
  if (n == -1) {
    return 1 / x;
  }
  let nextN = parseInt(n/2);
  const y = myPow(x, nextN);
  if (n % 2 === 0) {
      return y * y;
  } else if (n % 2 === -1) {
      return (1 / x) * y * y;
  } else {
    return x * y * y
  }
};

console.log(myPow(34.00515, -3))