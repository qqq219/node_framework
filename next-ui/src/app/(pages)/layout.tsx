'use client'
import { Provider } from "react-redux";
import { store } from "../common/store/store";
import PageLayOutComponent from "@/components/PageLayoutComponent";

export default function PageLayout({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            <PageLayOutComponent>{children}</PageLayOutComponent>
        </Provider>
    );
}