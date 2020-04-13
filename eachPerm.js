eachPerm = function(collection, iterator) {
  for(let i = 0; i < collection.length; i++){
    iterator(collection[i], i, collection);
  };
};