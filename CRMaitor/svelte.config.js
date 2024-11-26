// svelte.config.js
import path from 'path';

export default {
  kit: {
    alias: {
      $lib: path.resolve('./src/lib'),  // Alias $lib para la carpeta src/lib
      $components: path.resolve('./src/components')  // Alias $components para la carpeta src/components
    }
  }
};
