FROM node:14-alpine
# Set current working directory for container
WORKDIR /marketplace
#
COPY ./package.json .
# Command to install Dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]