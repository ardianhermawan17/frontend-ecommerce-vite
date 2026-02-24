'use client'

import { RecoilRoot } from 'recoil'
import type {ReactNode} from "react";

export function RecoilProvider({ children }: { children: ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>
}