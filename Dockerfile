FROM node as vite-app


# Set environment variables during the build process, just to make it easier to build locally for you guys
ENV VITE_URL=https://political-mire-enquiry.glitch.me

WORKDIR /app
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx.conf /etc/nginx
COPY --from=vite-app ./app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]