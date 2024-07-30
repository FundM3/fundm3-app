FROM node:20.10.0
WORKDIR /app
COPY . /app
RUN yarn install && \
yarn run build

EXPOSE 3000
CMD yarn run start

