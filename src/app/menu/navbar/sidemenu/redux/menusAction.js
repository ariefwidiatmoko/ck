import { MENUS_GET } from './menusConstant';

export const menusGet = (menus) => {
  return {
    type: MENUS_GET,
    payload: {
      menus,
    },
  };
};
