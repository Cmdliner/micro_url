# μrl (Micro url)

Basic url shortener with Express, Typescript, EJS and Redis

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.15. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## PROJECT STRUCTURE
```
.
├── bun.lockb
├── package.json
├── README.md
├── src
│   ├── config
│   │   └── db.ts
│   ├── index.ts
│   ├── murl.ts
│   ├── static
│   │   ├── fonts
│   │   └── styles.css
│   └── views
│       ├── Footer.ejs
│       ├── head.ejs
│       ├── index.ejs
│       └── template.ejs
└── tsconfig.json

6 directories, 12 files
```