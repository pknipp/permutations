let tsp = function(n){
  // randomly create the coordinates of the towns to be visited by salesman
  let x = [];
  let y = [];
  const max = 9;
  console.log("(x,y) coordinates of randomly distributed towns are given below:");
  for(let i = 0; i < n; i ++){
    let x0 = Math.ceil(max*Math.random());
    let y0 = Math.ceil(max*Math.random());
    x.push(x0);
    y.push(y0);
    console.log("town #",i," is located at (",x0,",",y0,")");
  }
  console.log('');

  let distance = function(x1,y1,x2,y2){
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  // created nested array of all intertown distances
  let interTownDistances = [];
  for(let i = 0; i < n; i ++){
    let interTownDistancesRow = [];
    for(let j = 0; j < n; j ++){
      interTownDistancesRow.push(distance(x[i],y[i],x[j],y[j]));
    }
    interTownDistances.push(interTownDistancesRow);
  }
  //Here are some changes
  // create array of arrays of all possible itineraries
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
  let itins = perm(n);

  // loop over all itineraries in order to find the smallest
  console.log('Below are shown the "local minima" distances for all',n,'! permutations of the paths between the',n,'towns.');
  let distanceMin = Infinity;
  for(const itin of itins){
    if(n === 0){
      return 0;
    }else{
      let distanceTot = distance(0,0,x[itin[0]],y[itin[0]]) + distance(0,0,x[itin[n - 1]],y[itin[n - 1]]);
      for(i = 0; i < n -1; i ++){
        distanceTot += interTownDistances[itin[i]][itin[i + 1]];
      }
      if(distanceTot < distanceMin){
        distanceMin = distanceTot;
        console.log("shortest path thus far is via",itin, "with a distance of ",Math.round(100*distanceMin)/100);
      }
    }
  }
  console.log(distanceMin);
  return distanceMin;
}
tsp(3);
