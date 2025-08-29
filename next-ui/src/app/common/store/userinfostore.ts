
import { configureStore, createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  value: {},
};
 
// 创建切片（包含状态和修改状态的方法）
const userinfoSlice = createSlice({
  name: 'userInfo', // 切片名称（用于区分不同状态）
  initialState,
  reducers: {
    setInitialState: (state:API.CurrentUser) => {
      initialState.value = state; // Redux Toolkit 内部自动处理了不可变性
    },
  },
});
 
// 导出 action 方法（供组件调用）
export const { setInitialState } = userinfoSlice.actions;

export const userinfoStore = configureStore({
  reducer: {
    counter: userinfoSlice.reducer, // 将 counter 切片的 reducer 注册到 store
  },
});