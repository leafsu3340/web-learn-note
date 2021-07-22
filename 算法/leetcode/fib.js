var fib = function(n) {
  const cache = [];
  for (let i = 0; i <= n; i++) {
      if (i === 0 || i === 1) {
          cache.push(i);
      } else {
          cache.push(cache[0] + cache[1]);
          cache.shift();
      }
  }
  return cache[1];
};

console.log(fib(3));