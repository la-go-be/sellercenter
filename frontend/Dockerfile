FROM fedora:25

# Install neccessary packages
RUN dnf install -y \
#    nodejs-1:6.10.0-1 \
#    nginx-1:1.10.2-1 \
    nodejs \
    nginx \
    supervisor \
    logrotate \
    git

RUN npm install -g bower

ADD dhparams.pem                /etc/ssl/private/

# Configure Nginx
RUN cp /etc/nginx/nginx.conf{,.original}
ADD nginx.conf                  /etc/nginx/

# Configure logrotate
ADD logrotate.nginx.conf        /etc/logrotate.d/nginx
ADD logrotate-loop.sh      	    /usr/bin/logrotate-loop

RUN chmod 644                   /etc/logrotate.d/nginx && \
    chown root:root	            /etc/logrotate.d/nginx

# Add files and folders of wep application
COPY www/                       /usr/share/nginx/html/www
COPY admin/                     /usr/share/nginx/html/admin
COPY coming-soon/               /usr/share/nginx/html/coming-soon

# Configure Supervisord
ADD supervisord.conf          	/etc/supervisord.conf
ADD supervisord.nginx.conf      /etc/supervisord.d/
ADD supervisord.logrotate.conf  /etc/supervisord.d/

# Run
WORKDIR /usr/share/nginx/html/www
RUN bower install --allow-root
RUN npm install --allow-root

WORKDIR /usr/share/nginx/html/admin
RUN bower install --allow-root
RUN npm install --allow-root

WORKDIR /usr/share/nginx/html/

EXPOSE 80 443

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
