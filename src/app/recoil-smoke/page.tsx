import { RecoilRoot, atom, useRecoilState } from 'recoil'

const atomA = atom({ key: 'smokeA', default: 'ok' })
function Test() {
    const [v] = useRecoilState(atomA)
    return <div>{v}</div>
}

export default function Page() {
    return (
        <RecoilRoot>
            <Test />
        </RecoilRoot>
    )
}