let perm2 = function(n){
  let facPerm = 1;
  let rangePerm = [];
  for(i = 1; i <= n; i ++){
    facPerm *= i;
    rangePerm.push(i-1);
  }
  let arrays = [];
  for(let iterPerm = 0; iterPerm < facPerm; iterPerm ++){
    let iter = iterPerm;
    let range = rangePerm.slice(0);
    let array = [];
    let fac = facPerm;
    for(place = n; place > 0; place --){
//      fac /= place;
//      let digit = Math.floor(iter/fac);
      let digit = iter % place;
      array.push(range.splice(digit,1)[0]);
//      iter -= digit * fac;
      iter -= digit;
      iter /= place;
    }
//    console.log(array);
    arrays.push(array);
  }
//  console.log(arrays);
  return arrays;
}
console.log(perm2(3));
