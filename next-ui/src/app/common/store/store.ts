
import { configureStore, createSlice } from '@reduxjs/toolkit';
 
 
// 创建切片（包含状态和修改状态的方法）
const userinfoSlice = createSlice({
  name: 'userInfo', // 切片名称（用于区分不同状态）
  initialState:{},
  reducers: {
    setInitialState: (state, action) => {
      state = action.payload; // Redux Toolkit 内部自动处理了不可变性
      return state;
    },
  },
});

const loadingSlice = createSlice({
  name: 'loading', 
  initialState:false,
  reducers: {
    setLoading: (state, action) => {
      state = action.payload; 
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    userinfo: userinfoSlice.reducer,
    loading: loadingSlice.reducer // 将 counter 切片的 reducer 注册到 store
  },
});

// 导出 action 方法（供组件调用）
export const { setInitialState } = userinfoSlice.actions;
export const { setLoading } = loadingSlice.actions;