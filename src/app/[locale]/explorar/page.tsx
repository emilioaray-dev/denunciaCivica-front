'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CaseCard } from '@/components/cases/case-card';
import { MOCK_CASES } from '@/lib/mock-data';
import { CATEGORY_KEYS } from '@/lib/constants';
import type { CaseCategory } from '@/types';

type FilterCategory = 'all' | CaseCategory;

export default function ExplorarPage() {
  const t = useTranslations('Explorar');
  const tCat = useTranslations('Categories');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filterOptions: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: t('all') },
    ...CATEGORY_KEYS.map((c) => ({ value: c.value, label: tCat(c.labelKey) })),
  ];

  const filtered = useMemo(() => {
    return MOCK_CASES.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        c.detaineeName.toLowerCase().includes(q) ||
        c.detentionLocation.toLowerCase().includes(q) ||
        c.residenceCity.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q);
      const matchCategory = activeCategory === 'all' || c.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const verifiedCount = MOCK_CASES.filter((c) => c.status === 'verified').length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('title')}
            </h1>
            <p className="text-muted-foreground">
              {t('subtitle', { total: MOCK_CASES.length, verified: verifiedCount })}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat.value
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((caso) => (
                <CaseCard key={caso.id} caso={caso} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <h3 className="font-display mb-1 text-lg font-semibold text-foreground">
                {t('noResultsTitle')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('noResultsSubtitle')}
              </p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
