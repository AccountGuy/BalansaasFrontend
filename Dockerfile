FROM node:20-alpine

USER root

RUN mkdir -p /BalansaasFrontend/node_modules && chown -R node:node /BalansaasFrontend

WORKDIR /BalansaasFrontend

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install --global pnpm

COPY --chown=node:node package.json package-lock.json ./

RUN pnpm install

COPY --chown=node:node . ./BalansaasFrontend

USER node

EXPOSE 5173

CMD [ "pnpm", "run", "dev", "--host" ]
