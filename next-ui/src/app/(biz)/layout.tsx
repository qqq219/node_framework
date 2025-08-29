import FrameworkLayout from "@/components/FrameworkLayout";

export default function BizPageLayout({ children }: React.PropsWithChildren) {
    return (
        <FrameworkLayout>
            {children}
        </FrameworkLayout>
    );
}