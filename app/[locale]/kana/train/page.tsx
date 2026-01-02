import KanaGame from '@/features/Kana/components/Game';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { CourseSchema } from '@/shared/components/SEO/CourseSchema';
import { BreadcrumbSchema } from '@/shared/components/SEO/BreadcrumbSchema';

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata('kanaTrain');
}

export default function Train() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://kanadojo.com' },
          { name: 'Kana', url: 'https://kanadojo.com/kana' },
          { name: 'Training', url: 'https://kanadojo.com/kana/train' }
        ]}
      />
      <CourseSchema
        name='Hiragana & Katakana Training'
        description='Master Japanese Hiragana and Katakana with interactive training modes including multiple choice, input practice, and speed tests.'
        url='https://kanadojo.com/kana/train'
        skillLevel='Beginner to Intermediate'
        learningResourceType='Interactive Training Game'
      />
      <KanaGame />
    </>
  );
}
