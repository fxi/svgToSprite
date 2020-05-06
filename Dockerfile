FROM node:10
WORKDIR svgToSprite
COPY . .
RUN npm install
CMD [ "node", "index.js" ]

