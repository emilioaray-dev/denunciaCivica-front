'use client';

import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t('home'), path: '/' as const },
    { label: t('explore'), path: '/explorar' as const },
    { label: t('report'), path: '/denunciar' as const },
    { label: t('track'), path: '/consultar' as const },
    { label: t('about'), path: '/sobre' as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Shield className="h-6 w-6 text-accent" />
          <span className="font-display text-lg font-semibold text-foreground">
            Denuncia Cívica
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.path
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Link href="/denunciar">
            <Button
              size="sm"
              className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
            >
              {t('registerReport')}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t('menuLabel')}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  pathname === item.path
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between px-3">
              <LanguageSwitcher />
            </div>
            <Link href="/denunciar" onClick={() => setMobileOpen(false)} className="mt-2">
              <Button className="w-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90">
                {t('registerReport')}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
