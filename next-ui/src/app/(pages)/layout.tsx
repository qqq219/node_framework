'use client'
import { Provider, useDispatch, useSelector } from "react-redux";
import { setInitialState, store } from "../common/store/store";
import { useEffect } from "react";
import { fetchUserInfo } from "../common/utils/access";

export default function PageLayout({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}