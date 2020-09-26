export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map((e) => Object.assign({}, e[1]));
  }
};
// get array value from array key
export const arrKeyValue = (arrMain, arrFilter, compare, result) => {
  let setArr = [];
  arrMain.forEach((main) => {
    for (let i = 0; i < arrFilter.length; i++) {
      if(main[compare] + "" === arrFilter[i] + "") {
        setArr.push(main[result]);
      }
      
    }
  });
  return setArr;
}
// Replace id with key of the object => for firestore
export const objectToArrayFirestore = (object) => {
  if (object) {
    return Object.entries(object).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};
