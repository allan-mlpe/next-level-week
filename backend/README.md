- Criando o package.json usando a image do node:
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm init -y `
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm install express `
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm install @types/express -D`
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm install ts-node -D`
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm install typescript -D`
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npx tsc --init`
`docker run --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim npm install ts-node-dev -D`
