declare module "*.module.css";
declare module "*.module.scss";
declare module "*.md" {
  const content: string;
  export default content;
}