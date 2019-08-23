# //
# Docker container for `kraft.ui` (opensource)
# //

FROM alpine:latest

#### prerequisites
RUN apk update && \
    apk upgrade && \
    apk add nodejs npm bash

#--- get nodejs runtime
RUN npm i -g n && n stable

#--- get `forever` to run project at background
RUN npm i -g forever

#### create project dir
RUN mkdir -p /opt/kraft-ui
WORKDIR /opt/kraft-ui

#--- packing project
COPY file-to-dock.tar.gz /tmp/

#--- extract project
RUN tar -xvf /tmp/file-to-dock.tar.gz -C /opt/kraft-ui/

#--- 
RUN chmod +x /opt/kraft-ui/server.js

#### clean up
RUN rm -rf /tmp/file-to-dock.tar.gz
RUN rm -rf /opt/kraft-ui/Dockerfile

#### set project run endpont
ENTRYPOINT ["/opt/kraft-ui/server.js"]
