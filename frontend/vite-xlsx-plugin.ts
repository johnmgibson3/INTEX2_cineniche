import type { Plugin } from 'vite';

export default function xlsxPlugin(): Plugin {
  return {
    name: 'vite-xlsx-plugin',
    transform(code, id) {
      if (!id.endsWith('.xlsx')) return null;

      // For .xlsx files, transform them to export their path
      // This allows the file to be loaded at runtime
      return `export default ${JSON.stringify(id)}`;
    },
  };
}
