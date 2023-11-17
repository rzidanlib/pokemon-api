/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly POKE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
