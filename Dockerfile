FROM oven/bun

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "run", "--env-file .env", "src/index.ts"]


