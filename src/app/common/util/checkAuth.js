export const checkAuthScope = (openModal, aS, pathname) => {
  return async (dispatch) => {
    const url = pathname.split('/');
    if (url.length > 0) {
      const menu = aS.m.filter((menu) => {
        return menu.id === url[1];
      })[0];
      if (menu && menu.v !== true) {
        dispatch(openModal('NotAuthorizedModal'));
      }
      if (menu && menu.v === true && url.length > 2) {
        const subm = aS.subm.filter((subm) => {
          return subm.id === url[2];
        })[0];
        if (subm && subm.v !== true) {
          dispatch(openModal('NotAuthorizedModal'));
        }
        if (subm && subm.c !== true && url[3] === 'create') {
          dispatch(openModal('NotAuthorizedModal'));
        }
        if (subm && subm.u !== true && url[3] === 'edit') {
          dispatch(openModal('NotAuthorizedModal'));
        }
      }
    }
  };
};

export const checkSession = (openModal) => {
  return (dispatch) => {
    openModal('SessionEndModal');
  };
};
