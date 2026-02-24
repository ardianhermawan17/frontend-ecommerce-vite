import {LibraryProvider} from "@shared/providers";
import {Suspense} from "react";
import {Outlet} from "react-router";

export default function RootLayout() {
    return(
        <LibraryProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet/>
            </Suspense>
        </LibraryProvider>
    )
}