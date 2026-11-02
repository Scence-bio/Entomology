# Atlas of Entomology — ئەتڵەسی مێرووناسی

ماڵپەڕەکە لە [www.entomo.online](https://www.entomo.online) بڵاو دەبێتەوە.

## دیپلۆی خۆکار

هەر پوشێک بۆ لقێ `master` لە GitHub Actions دا build دەکرێت و دەخرێتە لقێ `gh-pages`. ڕێکخستنەکە لە `.github/workflows/deploy.yml` ـە.

پێویستە لە ڕێکخستنی ڕیپۆکەدا GitHub Pages لەسەر لقێ `gh-pages` بێت. `public/CNAME` ناونیشانی `www.entomo.online` دەپارێزێت.

## کارکردن لەسەر کۆمپیوتەر

```bash
npm install
npm start
```

سایتی ناوخۆیی لە `http://localhost:3017` دەکرێتەوە.

## پرسیارەکانی کویز لە Google Sheets

١. لە Google Sheets شیتێکی نوێ دروست بکە: File ← Import ← فایلی `docs/quiz-questions.csv`.
٢. File ← Share ← Publish to web. شیتەکە هەڵبژێرە و جۆرەکەی بکە بە Comma-separated values (.csv)، پاشان Publish.
٣. بەستەرەکە کۆپی بکە و لە `src/quiz/config.js` بیخە ناو `SHEET_CSV_URL`. یەک جار commit و پووش بکە.

دوای ئەوە هەر گۆڕانکارییەک لە شیتەکەدا بکەیت، لە ماوەی چەند خولەکێکدا لە ماڵپەڕەکەدا دەردەکەوێت. پێویست بە commit و دیپلۆی ناکات. ئەگەر شیتەکە نەگەیشت، ماڵپەڕەکە دوایین وەشانی بارکراو یان پرسیارەکانی `src/quiz/questions.js` بەکاردەهێنێت.

ستوونەکان:

- `chapter`: `ch2` تا `ch14`. پرسیارەکە لە کویزی ئەو چاپتەرەدا و لە کویزی گشتیدا دەردەکەوێت.
- `section_ku`، `section_ar`، `section_en`: ناوی بەشەکە لە کویزی گشتیدا.
- `question_ku`، `question_ar`، `question_en`: پرسیارەکە.
- `a_ku` تا `d_ku` و بە هەمان شێوە بۆ `ar` و `en`: وەڵامەکان. دوو، سێ یان چوار وەڵام دەبێت.
- `correct`: پیتی وەڵامی ڕاست: `A`، `B`، `C` یان `D`.
- `why_ku`، `why_ar`، `why_en`: ڕوونکردنەوە دوای وەڵامدانەوە.
- `image`: ئارەزوومەندانە. بەستەری وێنەیەک، بۆ نموونە `/images/plates/ch6-bee.jpg`.

ئەگەر خانەیەکی عەرەبی یان ئینگلیزی بەتاڵ بێت، دەقە ئینگلیزییەکە و پاشان کوردییەکە بەکاردێت. ڕیزێک کە پرسیار یان وەڵامی ڕاستی نەبێت، پشتگوێ دەخرێت.

## ڕیزبەندیی کویز (Supabase)

١. لە supabase.com پرۆژەیەکی خۆڕایی دروست بکە.
٢. SQL Editor ← New query. ناوەڕۆکی `docs/leaderboard.sql` بلکێنە و Run بکە.
٣. Project Settings ← API: بەشی Project URL و کلیلی `anon` `public` لە `src/quiz/config.js` دابنێ.

کلیلی `anon` بۆ ئەوەیە لە وێبگەڕدا بێت. نهێنی نییە. هەر کەسێک دەتوانێت نمرەیەک بنێرێت، بۆیە ناوی نەشیاو لە Table Editor بسڕەوە.
