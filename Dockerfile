FROM node:alpine3.19 as package

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./ 

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

FROM node:alpine3.19 as build

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./ 

COPY --chown=node:node --from=package /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --production --frozen-lockfile

RUN yarn cache clean

USER node


FROM node:alpine3.19 AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/app.js"]


