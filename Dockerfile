FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY . .

EXPOSE PORT 4000

CMD ["bun", "run", "src/app.ts"]



