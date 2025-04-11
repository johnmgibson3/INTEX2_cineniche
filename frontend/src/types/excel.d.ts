// This declaration tells TypeScript how to handle imported Excel files
declare module '*.xlsx' {
  const content: string;
  export default content;
}
