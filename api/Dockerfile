FROM node:14-alpine
ENV PORT=8000
ENV NODE_ENV=${NODE_ENV}
ADD package.json /app/
WORKDIR /app
RUN yarn install --production
ADD . /app/
CMD ["yarn", "start"]
EXPOSE 8000