FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Serve static
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY --from=builder --chown=nodeuser:nodeuser /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000

CMD ["node", "build"]
