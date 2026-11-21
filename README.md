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

O build gera a pasta `out/`. O comando `npm run start` serve essa exportação estática localmente.

## Publicação

Publique o conteúdo da pasta `out/` em qualquer hospedagem de site estático. Antes da publicação, confirme:

- fotos reais e autorizadas em `public/images/clinica/estrutura/`;
- relação atual de convênios;
- prazo de resultados laboratoriais;
- domínio oficial, Instagram e dados da responsável técnica;
- textos de privacidade/cookies conforme a política jurídica da clínica.

Os dados editáveis de contato, especialidades, exames, convênios e FAQ estão em `src/data/clinic.ts`.
