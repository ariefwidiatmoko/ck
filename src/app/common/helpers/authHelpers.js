// join multiple roles
export const getArrAuth = (arrRoles, arrDetails) => {
  const newArr =
    arrRoles !== null
      ? arrRoles.toString().length > 0
        ? arrRoles.split(",")
        : []
      : [];
  const setAuth = [];
  arrDetails.forEach((auth) => {
    for (let i = 0; i < newArr.length; i++) {
      if (auth.id + "" === newArr[i] + "") {
        setAuth[setAuth.length] = {
          roleName: auth.roleName,
          detail: JSON.parse(auth.arrAuthorities),
        };
      }
    }
  });
  const getRoleName = [];
  const getDetail = [];
  setAuth.forEach((auth) => {
    const newObj1 = auth.roleName;
    const newObj2 = auth.detail;
    getRoleName.push(newObj1);
    getDetail.push(newObj2);
  });
  const getDetail0 = [];
  const getDetail1 = [];
  getDetail.forEach((detail) => {
    getDetail0.push(detail[0]);
    getDetail1.push(detail[1]);
  });
  let detail0 = [];
  if (getDetail0.length > 1) {
    for (let i = 0; i < getDetail0.length; i++) {
      if (i === 0) {
        detail0 = getDetail0[0];
      } else {
        for (let j = 0; j < getDetail0[i].length; j++) {
          if (detail0[j].v === true || getDetail0[i][j].v === true) {
            detail0[j].v = true;
          } else {
            detail0[j].v = false;
          }
        }
      }
    }
  } else {
    detail0 = getDetail0[0];
  }
  let detail1 = [];
  if (getDetail1.length > 1) {
    for (let i = 0; i < getDetail1.length; i++) {
      if (i === 0) {
        detail1 = getDetail1[0];
      } else {
        for (let j = 0; j < getDetail1[i].length; j++) {
          let v;
          let c;
          let u;
          let d;
          if (detail1[j].v === true || getDetail1[i][j].v === true) {
            v = true;
          } else {
            v = false;
          }
          if (detail1[j].c === true || getDetail1[i][j].c === true) {
            c = true;
          } else {
            c = false;
          }
          if (detail1[j].u === true || getDetail1[i][j].u === true) {
            u = true;
          } else {
            u = false;
          }
          if (detail1[j].d === true || getDetail1[i][j].d === true) {
            d = true;
          } else {
            d = false;
          }
          detail1[j].v = v;
          detail1[j].c = c;
          detail1[j].u = u;
          detail1[j].d = d;
        }
      }
    }
  } else {
    detail1 = getDetail1[0];
  }
  const arrAuth = {
    arrRoles: getRoleName,
    detail: { m: detail0, subm: detail1 },
  };
  return arrAuth;
};
