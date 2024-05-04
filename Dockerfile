# # Use node.js 20 image as the base image
# FROM node:20-alpine

# # Set the working directory inside the container
# WORKDIR /BalansaasFrontend

# # Install pnpm globally
# RUN npm install -g pnpm

# # Copy package.json, pnpm-lock.yaml, and pnpm-workspace.yaml to the container
# COPY package.json pnpm-lock.yaml pnpm-workspaces.yaml ./

# # Install dependencies
# RUN pnpm install

# # Copy the rest of the application code to the container
# COPY . .

# EXPOSE 8000
# # Command to run the Vite development server
# CMD ["pnpm", "run", "dev"]

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
