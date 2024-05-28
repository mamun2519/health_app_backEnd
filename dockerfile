FROM node:20
WORKDIR /doctor_service
COPY  . .
RUN npm install
RUN npm run build
EXPOSE 5000
RUN ["chmod", "+x", "./dockerCommand.sh"]
ENTRYPOINT [ "sh", "./dockerCommand.sh" ]