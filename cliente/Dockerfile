FROM node:12.2.0-alpine as client

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package*.json /app/

RUN yarn

RUN npm install react-scripts -g --silent

COPY . .

RUN yarn build 

FROM nginx:latest 

EXPOSE 80

COPY --from=client /app/build/ /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d

CMD ["nginx","-g","daemon off;"]