## Jogo Da Memoria Master

Uma aplicação web baseada em Vue.js projetada para gerenciar e jogar jogos de cartas. Este projeto é construído com Vuetify para componentes de UI e inclui um backend para gerenciamento de dados.

 [Projeto antigohttps://img.shields.io/badge/Status-Projeto%20Antigo-red](https://img.shields.io/badge/Status-Projeto%20Antigo-red)


## Recursos

  Interface amigável construída com Vuetify.

  Gerenciamento de cartas e configuração do jogo.

  Arquitetura modular com componentes reutilizáveis.

   Integração com backend para persistência de dados.

## Estrutura do Projeto
/Project-Name  
│── babel.config.js  
│── database.json  
│── package.json  
│── README.md  
│── vue.config.js 
│  
├── BACKEND/  
│   ├── database.json  
│
├── public/   
│   ├── favicon.ico   
│   ├── index.html   
│   ├── assets/  
│   │   ├── logo.png   
│   │   ├── logo.svg   
│   │   ├── sem_imagem.png      
│   ├── cartas/     
│   ├── Nova pasta/      
│        
├── src/        
│   ├── App.vue     
│   ├── main.js       
│   ├── assets/          
│   │   ├── logo.png         
│   │   ├── logo.svg        
│   │   ├── sem_imagem.png       
│   │   ├── cartas/         
│   ├── vue/      
│   │   ├── components/         
│   │   │   ├── Jogar/         
│   │   │   ├── shared/        
│   │   ├── plugins/         
│   │   │   ├── vuetify.js          
│   │   ├── router/            
│   │   │   ├── index.js        
│   │   ├── services/           
│   │   │   ├── CartasService.js         
│   │   │   ├── MenuService.js            
│   │   │   ├── UsuarioService.js        
│   │   ├── views/        
│   │   │   ├── Admin.vue         
│   │   │   ├── ConfigurarCartas.vue          
│   │   │   ├── ConfigurarJogo.vue    


## Instalação

1. Clone o repositório:
   ```sh
   git clone <repository-url>
   ```  

2. Acesse o diretório do projeto:
   ```sh
   cd Project-Name
   ```  

3. Instale as dependências:
   ```sh
   npm install
   ```  

4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run serve
   ```

 ### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Backend

A configuração do backend está localizada no diretório BACKEND/. Certifique-se de que o arquivo database.json está devidamente configurado para o seu ambiente.

Contribuição

Contribuições são bem-vindas! Por favor, faça um fork do repositório e envie um pull request.

Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes






