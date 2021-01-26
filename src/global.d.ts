import type { RecoilState } from "recoil";

declare global {
    type ArrayElement<ArrayType extends readonly unknown[]> =
        ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

    type ExtractRecoilStateType<P> = P extends RecoilState<infer T> ? T : never;

    type GetComponentProps<T> = T extends
        | React.ComponentType<infer P>
        | React.Component<infer P>
        ? P
        : never;
}
