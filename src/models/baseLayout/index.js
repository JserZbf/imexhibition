import sideMenuConfig from 'config/sideMenuConfig';


export default {
  namespace: 'baseLayout',
  state: {
    sideMenus: sideMenuConfig,
    feConfig: {},
    settingDrawerVisible: false,
    totalSettingConfig: {
      showTrackingInfo: false,
    },
  },
  subscriptions: {
    setUp( ) {
      // 权限过滤
    },
  },
  effects: {
   
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
