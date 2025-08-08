import { Suspense } from "react";
import ThemePage from "./themePage";

export default function MyComponent() {
    return (
        <Suspense fallback={<p className="text-lg">Loading halaman tema...</p>}>
            <ThemePage />
        </Suspense>
    );
}