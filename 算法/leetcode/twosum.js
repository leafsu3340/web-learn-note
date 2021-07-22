var twoSum = function(nums, target) {
  const numMap = {}
  let ret = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
      if (numMap[nums[i]]||numMap[nums[i]]===0) {
        ret = [numMap[nums[i]], i];
        break;
      } else {
        numMap[target - nums[i]] = i;
      }
  }
  return ret;
};

console.log(twoSum([2,7,2,3,5], 9));
