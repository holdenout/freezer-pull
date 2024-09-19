FROM node:20
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3000
