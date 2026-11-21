# Clínica Núcleo de Saúde Mais

Site institucional responsivo da Clínica Núcleo de Saúde Mais, construído com Next.js, TypeScript e CSS modular em uma única página estática.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação e build

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Para produção local, `npm run start` inicia o servidor Next.js depois do build.

## Publicação na Vercel

Use o preset `Next.js` com as configurações padrão. Informe apenas `npm run build` se a Vercel pedir um comando de build. Não sobrescreva o diretório de saída: ele deve permanecer como `.next`.

## Publicação em host estático

Se for necessário publicar em um host puramente estático, será preciso reativar `output: 'export'` no `next.config.mjs` e publicar a pasta `out/`. Antes da publicação, confirme:

- fotos reais e autorizadas em `public/images/clinica/estrutura/`;
- relação atual de convênios;
- prazo de resultados laboratoriais;
- domínio oficial, Instagram e dados da responsável técnica;
- textos de privacidade/cookies conforme a política jurídica da clínica.

Os dados editáveis de contato, especialidades, exames, convênios e FAQ estão em `src/data/clinic.ts`.
