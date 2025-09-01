'use client'
import { Provider, useSelector } from "react-redux";
import { store } from "../common/store/store";

export default function PageLayout({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}