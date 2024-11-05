// components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

// プロパティの型を指定
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProviderコンポーネントの定義
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"        // HTMLタグに`class="dark"`などを設定
      defaultTheme="system"    // ユーザーのシステム設定に基づいてテーマを切り替え
      enableSystem             // システムテーマの自動適用を有効化
    >
      {children}
    </NextThemesProvider>
  );
}
