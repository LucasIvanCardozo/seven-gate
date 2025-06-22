FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install react-icons

COPY . .

RUN ls -la prisma/schema.prisma

# RUN npm run build

CMD ["npm", "run", "dev"]
