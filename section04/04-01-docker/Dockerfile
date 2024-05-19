## 1. 운영체제 및 프로그램 설치 - 이 때부터는 EC2와 환경이 동일해진다.
#FROM ubuntu:22.04
#
## nodejs 설치
#RUN sudo apt install nodejs
#RUN sudo npm install -g yarn


# 1. 운영체제 및 프로그램 설치 (이미 Linux, node, npm, yarn 까지 설치되어있는 컴퓨터를 다운로드하는 방식)
FROM node:20.0

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /index.js

# 3. 도커안에서 index.js 실행시키기
CMD node index.js
