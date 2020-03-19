let perm = function(n){
  if(n === 0){
    return [[]];
  } else {
    let arrays = perm(n-1);
    // m = (n-1)!
    let m = arrays.length;
    for(i = 0; i < m; i ++){
      for(let j = 0; j <= n - 1; j ++){
        let workArray = arrays[0].slice(0);
        workArray.splice(j,0,n - 1);
        arrays.push(workArray);
      }
      arrays.shift();
    }
    return arrays;
  }
}

