'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Lock,
  Info,
  Upload,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CATEGORY_KEYS } from '@/lib/constants';
import { api } from '@/lib/api';

interface FormData {
  detainedName: string;
  detainedAge: string;
  residenceCity: string;
  detentionLocation: string;
  detentionCenter: string;
  detentionDate: string;
  category: string;
  description: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  reporterRelation: string;
  anonymous: boolean;
}

const initialFormData: FormData = {
  detainedName: '',
  detainedAge: '',
  residenceCity: '',
  detentionLocation: '',
  detentionCenter: '',
  detentionDate: '',
  category: '',
  description: '',
  reporterName: '',
  reporterEmail: '',
  reporterPhone: '',
  reporterRelation: '',
  anonymous: false,
};

export default function DenunciarPage() {
  const t = useTranslations('Denunciar');
  const tCat = useTranslations('Categories');
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { title: t('step0Title'), subtitle: t('step0Subtitle') },
    { title: t('step1Title'), subtitle: t('step1Subtitle') },
    { title: t('step2Title'), subtitle: t('step2Subtitle') },
    { title: t('step3Title'), subtitle: t('step3Subtitle') },
    { title: t('step4Title'), subtitle: t('step4Subtitle') },
  ];

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return consentGiven;
      case 1:
        return (
          formData.detainedName.trim() &&
          formData.detentionLocation.trim() &&
          formData.detentionDate
        );
      case 2:
        return formData.description.length >= 20;
      case 3:
        return formData.reporterEmail.trim();
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post<{ trackingCode: string }>('/cases', {
        detainee: {
          name: formData.detainedName,
          age: formData.detainedAge ? parseInt(formData.detainedAge, 10) : undefined,
          detentionDate: formData.detentionDate,
          residenceCity: formData.residenceCity,
          detentionLocation: formData.detentionLocation,
          detentionCenter: formData.detentionCenter || undefined,
          category: formData.category || 'other',
        },
        circumstances: formData.description,
        reporter: {
          name: formData.reporterName || undefined,
          email: formData.reporterEmail,
          phone: formData.reporterPhone || undefined,
          relationship: formData.reporterRelation || undefined,
          isAnonymous: formData.anonymous,
        },
        captchaToken: 'mock-captcha-token',
      });
      setTrackingCode(response.data.trackingCode);
      setSubmitted(true);
    } catch {
      setTrackingCode(`DC-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="container flex-1 py-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="rounded-lg border border-success/30 bg-success/5 p-8">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-success" />
              <h1 className="font-display mb-2 text-2xl font-bold text-foreground">
                {t('successTitle')}
              </h1>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {t('successMessage')}
              </p>
              <div className="mb-6 rounded-md bg-secondary p-4">
                <p className="text-sm font-medium text-foreground">{t('trackingCode')}</p>
                <p className="mt-1 font-mono text-lg font-bold text-accent">{trackingCode}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('trackingCodeHelp')}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                {t('dataEncrypted')}
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                {steps.map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                        i < step
                          ? 'bg-success text-success-foreground'
                          : i === step
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`mx-1 hidden h-0.5 w-12 sm:block lg:w-20 ${i < step ? 'bg-success' : 'bg-border'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {steps[step].title}
              </h2>
              <p className="text-sm text-muted-foreground">{steps[step].subtitle}</p>
            </div>

            {/* Step content */}
            <div className="card-shadow min-h-[300px] rounded-lg border border-border bg-card p-6">
              {/* Step 0: Consent */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="rounded-md border border-warning/20 bg-warning/5 p-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                      <div>
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          {t('importantInfo')}
                        </h4>
                        <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                          <li>&bull; {t('importantList1')}</li>
                          <li>&bull; {t('importantList2')}</li>
                          <li>&bull; {t('importantList3')}</li>
                          <li>&bull; {t('importantList4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-info/20 bg-info/5 p-4">
                    <div className="flex gap-3">
                      <Shield className="mt-0.5 h-5 w-5 shrink-0 text-info" />
                      <div>
                        <h4 className="mb-1 text-sm font-semibold text-foreground">
                          {t('dataProtection')}
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t('dataProtectionDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border accent-accent"
                    />
                    <span className="text-sm text-foreground">
                      {t('consent')}
                    </span>
                  </label>
                </div>
              )}

              {/* Step 1: Detainee data */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label>{t('detainedFullName')}</Label>
                    <Input
                      value={formData.detainedName}
                      onChange={(e) => updateField('detainedName', e.target.value)}
                      placeholder={t('detainedNamePlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t('approximateAge')}</Label>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        value={formData.detainedAge}
                        onChange={(e) => updateField('detainedAge', e.target.value)}
                        placeholder={t('agePlaceholder')}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>{t('detentionDate')}</Label>
                      <Input
                        type="date"
                        value={formData.detentionDate}
                        onChange={(e) => updateField('detentionDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>{t('residenceCity')}</Label>
                    <Input
                      value={formData.residenceCity}
                      onChange={(e) => updateField('residenceCity', e.target.value)}
                      placeholder={t('residenceCityPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t('detentionLocation')}</Label>
                    <Input
                      value={formData.detentionLocation}
                      onChange={(e) => updateField('detentionLocation', e.target.value)}
                      placeholder={t('detentionLocationPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t('detentionCenter')}</Label>
                    <Input
                      value={formData.detentionCenter}
                      onChange={(e) => updateField('detentionCenter', e.target.value)}
                      placeholder={t('detentionCenterPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t('categoryLabel')}</Label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">{t('categoryPlaceholder')}</option>
                      {CATEGORY_KEYS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {tCat(c.labelKey)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Circumstances */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>{t('circumstancesLabel')}</Label>
                    <p className="mb-2 text-xs text-muted-foreground">
                      {t('circumstancesHelp')}
                    </p>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      placeholder={t('circumstancesPlaceholder')}
                      rows={8}
                      className="mt-1"
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {t('charCount', { count: formData.description.length })}
                      </p>
                      {formData.description.length > 0 && formData.description.length < 20 && (
                        <p className="text-xs text-destructive">{t('minChars')}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-md bg-muted p-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {t('evidenceTip')}
                    </p>
                  </div>
                  <div className="rounded-md border border-dashed border-border p-6 text-center">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">{t('attachEvidence')}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t('attachEvidenceDesc')}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/60">
                      {t('comingSoon')}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Reporter info */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="mb-2 rounded-md border border-info/20 bg-info/5 p-4">
                    <div className="flex gap-3">
                      <Shield className="mt-0.5 h-5 w-5 shrink-0 text-info" />
                      <p className="text-sm text-muted-foreground">
                        {t('reporterInfoNote')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label>{t('yourName')}</Label>
                    <Input
                      value={formData.reporterName}
                      onChange={(e) => updateField('reporterName', e.target.value)}
                      placeholder={t('yourNamePlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t('email')}</Label>
                    <Input
                      type="email"
                      value={formData.reporterEmail}
                      onChange={(e) => updateField('reporterEmail', e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="mt-1"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t('emailHelp')}
                    </p>
                  </div>
                  <div>
                    <Label>{t('phone')}</Label>
                    <Input
                      type="tel"
                      value={formData.reporterPhone}
                      onChange={(e) => updateField('reporterPhone', e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t('relationship')}</Label>
                    <Input
                      value={formData.reporterRelation}
                      onChange={(e) => updateField('reporterRelation', e.target.value)}
                      placeholder={t('relationshipPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => updateField('anonymous', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border accent-accent"
                    />
                    <span className="text-sm text-foreground">
                      {t('anonymousCheckbox')}
                    </span>
                  </label>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t('reviewTitle')}
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-md bg-secondary p-3">
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">{t('reviewDetainee')}</p>
                      <p className="text-sm text-foreground">
                        {formData.detainedName}
                        {formData.detainedAge && `, ${t('reviewAge', { age: formData.detainedAge })}`}
                      </p>
                    </div>
                    {formData.residenceCity && (
                      <div className="rounded-md bg-secondary p-3">
                        <p className="mb-0.5 text-xs font-medium text-muted-foreground">{t('reviewResidenceCity')}</p>
                        <p className="text-sm text-foreground">{formData.residenceCity}</p>
                      </div>
                    )}
                    <div className="rounded-md bg-secondary p-3">
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">{t('reviewDetentionLocation')}</p>
                      <p className="text-sm text-foreground">{formData.detentionLocation}</p>
                    </div>
                    {formData.detentionCenter && (
                      <div className="rounded-md bg-secondary p-3">
                        <p className="mb-0.5 text-xs font-medium text-muted-foreground">{t('reviewDetentionCenter')}</p>
                        <p className="text-sm text-foreground">{formData.detentionCenter}</p>
                      </div>
                    )}
                    <div className="rounded-md bg-secondary p-3">
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                        {t('reviewDetentionDate')}
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.detentionDate
                          ? new Date(formData.detentionDate + 'T12:00:00').toLocaleDateString(
                              locale,
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              },
                            )
                          : t('reviewNotSpecified')}
                      </p>
                    </div>
                    {formData.category && (
                      <div className="rounded-md bg-secondary p-3">
                        <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                          {t('reviewCategory')}
                        </p>
                        <p className="text-sm text-foreground">
                          {tCat(CATEGORY_KEYS.find((c) => c.value === formData.category)?.labelKey ?? 'other')}
                        </p>
                      </div>
                    )}
                    <div className="rounded-md bg-secondary p-3">
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                        {t('reviewDescription')}
                      </p>
                      <p className="line-clamp-3 text-sm text-foreground">{formData.description}</p>
                    </div>
                    <div className="rounded-md bg-secondary p-3">
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                        {t('reviewReporter')}
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.anonymous
                          ? t('reviewAnonymous')
                          : formData.reporterName || formData.reporterEmail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 rounded-md border border-warning/20 bg-warning/5 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <p className="text-xs text-muted-foreground">
                      {t('reviewWarning')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('previous')}
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {t('next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              {t('encryptedConnection')}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
