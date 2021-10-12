let tsp = function(n){
  // randomly create the coordinates of the towns to be visited by salesman
  let x = [];
  let y = [];
  const max = 9;
  console.log("(x,y) coordinates of randomly distributed towns are given below (not including origin, which is both the first and last stop):");
  for(let i = 0; i < n; i ++){
    let x0 = Math.ceil(max*Math.random());
    let y0 = Math.ceil(max*Math.random());
    x.push(x0);
    y.push(y0);
    console.log("town #",i," is located at (",x0,",",y0,")");
  }
  console.log("town #",n,"is located at the origin.");
  // Let the last "town" be the origin:
  x.push(0);
  y.push(0);
  console.log('');

  let distance = function(x1,y1,x2,y2){
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  // created nested array of all intertown distances (including origin as last town) for later use as a lookup table
  let interTownDistances = [];
  for(let i = 0; i <= n; i ++){
    let interTownDistancesRow = [];
    for(let j = 0; j <= n; j ++){
      interTownDistancesRow.push(distance(x[i],y[i],x[j],y[j]));
    }
    interTownDistances.push(interTownDistancesRow);
  }

  let perm = function(n){
    let facPerm = 1;
    let rangePerm = [];
    for(i = 1; i <= n; i ++){
      facPerm *= i;
      rangePerm.push(i-1);
    }
    let distanceMin = Infinity;
    let digits = [];
    let partialDistances = [];
    partialDistances[n] = 0;
    console.log('Below are shown the "local minima" distances for all',n,'! permutations of the paths between the',n,'towns.');
    for(let iterPerm = 0; iterPerm < facPerm; iterPerm ++){
      let itin = [];
      let digitLast = n;
      let distanceTot = 0;
      let iter = iterPerm;
      let range = rangePerm.slice(0);
      let fac = facPerm;
      let areSame = true;
      for(place = n - 1; place >= 0; place --){
        fac /= (place + 1);
        let digit = range.splice(Math.floor(iter/fac),1)[0];
        itin.push(digit);
        if(!areSame || digit !== digits[place]){
          digits[place] = digit;
          areSame = false;
        }
        if(!areSame){
          partialDistances[place] = partialDistances[place + 1] + interTownDistances[digitLast][digit];
        }
        iter -= digit * fac;
        digitLast = digit;
      }
      // saleman starts and ends at the origin, which (x[n],y[n]) are defined to be.
      itin.unshift(n);
      itin.push(n);
      partialDistances[0] += interTownDistances[digitLast][n];
      if(partialDistances[0] < distanceMin){
        distanceMin = partialDistances[0];
        console.log("shortest path thus far is via",itin, "with a distance of ",Math.round(100*distanceMin)/100);
      }
    }
    return distanceMin;
  }
  console.log(perm(n));
}
tsp(10);
