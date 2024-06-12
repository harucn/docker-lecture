FROM ubuntu:latest

RUN mkdir -p /usr/local/sample

WORKDIR /usr/local/sample

# hello.sh を作成
RUN echo "#!/bin/bash" > ./hello.sh
RUN echo "echo Hello, World!" >> ./hello.sh
RUN echo "echo HELLO, WORLD!" >> ./hello.sh

RUN mkdir -p /usr/local/dummy

# hello.sh に実行権限を付与
RUN chmod +x hello.sh
