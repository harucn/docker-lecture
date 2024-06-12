FROM ubuntu:latest

RUN mkdir -p /usr/local/sample
RUN mkdir -p /usr/local/dummy

WORKDIR /usr/local/sample

# hello.sh を作成
RUN echo "#!/bin/bash" > ./hello.sh
RUN echo "echo Hello, World!" >> ./hello.sh
RUN echo "echo HELLO, WORLD!" >> ./hello.sh

# hello.sh に実行権限を付与
RUN chmod +x hello.sh
