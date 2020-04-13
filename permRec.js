let perm = function(n){
  if(n === 0){
    return [[]];
  } else {
    let arrays = perm(n-1);
    let m = arrays.length;
    for(let i = 0; i < m; i ++){
      for(let j = 0; j <= n - 1; j ++){
        let workArray = arrays[0].slice(0);
        // The first subarray gets spliced m times (in a different spot each time)
        workArray.splice(j,0,n - 1);
        // Push each spliced subarray to the end of the main array
        // (Don't worry; the j-loop will end before encountering this next-recursion stuff.)
        arrays.push(workArray);
      }
      // We are now done with this recursive call, so we no longer need this stuff.
      arrays.shift();
    }
    console.log(arrays);
    return arrays;
  }
}

perm(4);
