#### Iniciando o projeto [do zero] com o `expo`:

- Iniciar um container do node em modo interativo:

`docker run -it --rm -v ${PWD}:/usr/app -w /usr/app node:12.18.0-slim bash`

- Dentro do container rodar o seguintes comandos:
```
$ npm install -g expo expo-cli
$ expo init myProject
```

- O comando `expo init myProject` criará a estrutura do projeto no diretório `myProject` e pedirá um template para o seu projeto. Caso queira evitar a interação nesse ponto, crie o projeto usando `expo init myProject --template <NOME_DO_TEMPLATE>`.


#### Links úteis

- https://medium.com/@hmajid2301/running-expo-react-native-in-docker-ff9c4f2a4388