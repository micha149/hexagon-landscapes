declare module "*.glsl" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const Image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { Image };
}

declare module 'tailwindcss/colors';