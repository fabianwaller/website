# Extracting the search library into an npm package

The search implementation is now independent of React, Next.js, and the
website's document types. Keep the language-neutral API and English language
data as separate package entry points.

## 1. Create the repository

```bash
mkdir document-search
cd document-search
git init
npm init -y
npm install stopword synonyms wink-porter2-stemmer
npm install --save-dev typescript tsup vitest publint @arethetypeswrong/cli
```

Use a scoped package name if the unscoped name is unavailable:

```json
{
  "name": "@your-scope/document-search"
}
```

## 2. Copy the source and tests

Use this structure:

```text
document-search/
├── src/
│   ├── document-search.ts
│   ├── english.ts
│   ├── english-synonyms.ts
│   ├── index.ts
│   └── vendor.d.ts
├── test/
│   └── document-search.test.ts
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

Copy these files:

- `src/lib/search/document-search.ts` to `src/document-search.ts`
- `src/lib/search/english.ts` to `src/english.ts`
- `src/lib/search/english-synonyms.ts` to `src/english-synonyms.ts`
- `src/lib/search/index.ts` to `src/index.ts`
- `src/lib/search/vendor.d.ts` to `src/vendor.d.ts`
- `__tests__/document-search.test.ts` to `test/document-search.test.ts`

Replace the test imports from `@/lib/search` with `../src` and from
`@/lib/search/english` with `../src/english`.

## 3. Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "declaration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noUncheckedIndexedAccess": true,
    "strict": true,
    "target": "ES2022"
  },
  "include": ["src", "test"]
}
```

The website currently has `strict: false`. Expect to fix any strictness errors
found after extraction rather than weakening the package configuration.

## 4. Configure builds and entry points

Create `tsup.config.ts`:

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    english: "src/english.ts",
    "english-synonyms": "src/english-synonyms.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  target: "es2022",
});
```

Use these relevant `package.json` fields:

```json
{
  "type": "module",
  "files": ["dist", "LICENSE", "README.md"],
  "sideEffects": false,
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./english": {
      "types": "./dist/english.d.ts",
      "import": "./dist/english.js",
      "require": "./dist/english.cjs"
    },
    "./english-synonyms": {
      "types": "./dist/english-synonyms.d.ts",
      "import": "./dist/english-synonyms.js",
      "require": "./dist/english-synonyms.cjs"
    }
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "check:package": "publint && attw --pack",
    "prepublishOnly": "npm run test && npm run typecheck && npm run build && npm run check:package"
  },
  "engines": {
    "node": ">=18"
  },
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

The root entry point remains language-neutral. Consumers opt into the larger
English stop-word, stemmer, and synonym datasets through
`@your-scope/document-search/english` and
`@your-scope/document-search/english-synonyms`.

Keep the synonym entry point out of client bundles when building static
indexes. `buildSerializedIndex` resolves the relevant synonym relationships
while building; the client only needs the analyzer and compact serialized
query expansions.

## 5. Document the supported API

The README should include:

- The index is immutable; rebuild it when the source collection changes.
- Documents can have any shape.
- Fields are explicitly selected and may be weighted.
- Expensive synonym expansion can be disabled per field with
  `expandSynonyms: false`.
- The default analyzer only normalizes and tokenizes Unicode text.
- English stemming and stop words are opt-in.
- The English synonym dictionary is opt-in and increases bundle size.
- Custom synonym maps are bidirectional and are supplied to `buildIndex`.
- Scores are meaningful only within one query and index, not across indexes.

Example:

```ts
import { buildIndex, defineFields } from "@your-scope/document-search";
import {
  englishSynonyms,
} from "@your-scope/document-search/english-synonyms";
import { englishAnalyzer } from "@your-scope/document-search/english";

const index = buildIndex(products, {
  fields: defineFields(
    { name: "name", value: (product) => product.name, weight: 3 },
    { name: "description", value: (product) => product.description },
    { name: "tags", value: (product) => product.tags, weight: 2 },
  ),
  analyzer: englishAnalyzer(),
  synonyms: [
    englishSynonyms,
    {
      sneaker: ["trainer", "running shoe"],
    },
  ],
});

const results = index.search({
  text: "lightweight trainers",
  limit: 20,
  offset: 0,
  minScore: 0.05,
});
```

For static Next.js content, build and project the index in a server-only
module:

```ts
import "server-only";

import { buildSerializedIndex } from "@your-scope/document-search";
import { englishAnalyzer } from "@your-scope/document-search/english";
import { englishSynonyms } from "@your-scope/document-search/english-synonyms";

export const searchData = buildSerializedIndex(posts, {
  fields,
  analyzer: englishAnalyzer(),
  synonyms: englishSynonyms,
  store: (post) => ({ slug: post.slug, title: post.title }),
});
```

Pass `searchData` through a statically rendered Server Component, then load it
in the client without rebuilding:

```tsx
"use client";

import { useMemo } from "react";
import { loadIndex } from "@your-scope/document-search";
import { englishAnalyzer } from "@your-scope/document-search/english";

const analyzer = englishAnalyzer();

export function Search({ searchData }) {
  const index = useMemo(
    () => loadIndex(searchData, { analyzer }),
    [searchData],
  );

  return index.search("query");
}
```

Only values returned by `store` are included with results. Source fields used
for indexing are not serialized.

When Next.js prerenders routes in multiple workers, module-level index
construction can still run once per worker. Generate a JSON artifact before
`next build` instead:

```json
{
  "scripts": {
    "search:index": "tsx scripts/build-search-index.ts",
    "prebuild": "npm run search:index",
    "build": "next build"
  }
}
```

The generator calls `buildSerializedIndex` once and writes its output under
`src/generated`. Server Components import that JSON artifact; they must not
call `buildSerializedIndex` themselves.

## 6. Verify the package tarball

Run all checks before publishing:

```bash
npm test
npm run typecheck
npm run build
npm run check:package
npm pack --dry-run
```

Create a small fixture project that installs the generated tarball and imports
both entry points in ESM and CommonJS. This catches export-map and declaration
problems that source-level tests do not.

## 7. Publish

Authenticate and confirm the package name:

```bash
npm login
npm whoami
npm view @your-scope/document-search
```

Commit the release, tag it, and publish:

```bash
git add .
git commit -m "Initial document search package"
npm version 0.1.0
git push --follow-tags
npm publish
```

For later releases, follow semantic versioning:

- Patch: fixes without observable API changes.
- Minor: backward-compatible fields, options, or entry points.
- Major: changed exports, result semantics, analyzer behavior, or scoring.

## 8. Consume it from this website

Install the package:

```bash
npm install @your-scope/document-search
```

Then replace:

```ts
import { buildIndex, defineFields } from "@/lib/search";
import { englishSynonyms } from "@/lib/search/english-synonyms";
import { englishAnalyzer } from "@/lib/search/english";
```

with:

```ts
import { buildIndex, defineFields } from "@your-scope/document-search";
import {
  englishSynonyms,
} from "@your-scope/document-search/english-synonyms";
import { englishAnalyzer } from "@your-scope/document-search/english";
```

After the website builds and its search tests pass, delete `src/lib/search`.
