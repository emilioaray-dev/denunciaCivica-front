'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLocale: 'es' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-secondary p-0.5 text-xs font-medium">
      <button
        onClick={() => switchTo('es')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === 'es'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchTo('en')}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === 'en'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}
