/// <reference types="vite/client" />

// Из официальной документации vite. Типизируем переменную окружения. Должна начинатся с VITE_
// Доступ к ней в коде import.meta.env.VITE_API_BASE_URL
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}