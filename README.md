# Desordem Paranormal

Projeto feito para estudo, com o objetivo de visualizar como a história de [Ordem Paranormal](https://ordemparanormal.fandom.com/wiki/Ordem_Paranormal_Wiki) se conecta.

## Funcionalidades

- [Grafo](https://www.google.com/search?q=grafo&sca_esv=8c6b6505ed11823e&sxsrf=AE3TifN36-Z_oc0eycuPFnvk4iWCmtuRFQ%3A1766004876607&ei=jBhDaezjJOHE1sQPuZzLkQM&ved=0ahUKEwjs2d3qwMWRAxVhopUCHTnOMjIQ4dUDCBE&uact=5&oq=grafo&gs_lp=Egxnd3Mtd2l6LXNlcnAiBWdyYWZvMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyChAAGIAEGEMYigUyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESNUPUABYjwtwAXgBkAEAmAGqAaABqgWqAQMwLjW4AQPIAQD4AQGYAgagAsUFqAIUwgIHECMYJxjqAsICChAjGPAFGCcY6gLCAhYQABiABBhDGLQCGOcGGIoFGOoC2AEBwgIKECMYgAQYJxiKBcICChAuGIAEGCcYigXCAhEQLhiABBixAxjRAxiDARjHAcICCxAAGIAEGLEDGIMBwgIKEC4YgAQYQxiKBcICDhAAGIAEGLEDGIMBGIoFwgILEC4YgAQYsQMYgwHCAggQLhiABBixA8ICCxAAGIAEGJIDGIoFwgIFEC4YgATCAg0QABiABBixAxhDGIoFwgIIEAAYgAQYyQOYAwfxBdDGZhV-BCuSugYGCAEQARgBkgcDMS41oAfiR7IHAzAuNbgHvgXCBwUwLjIuNMgHFoAIAA&sclient=gws-wiz-serp) interativo que representa a conexão entre páginas;
- [Pesquisa semântica](https://www.google.com/search?q=pesquisa+semantica&oq=Pesquisa+seman&gs_lcrp=EgRlZGdlKgoIABAAGIAEGPkHMgoIABAAGIAEGPkHMgcIARAAGIAEMgYIAhBFGDkyBwgDEAAYgAQyCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMgYICBBFGDzSAQg2NDQxajBqMagCALACAQ&sourceid=chrome&ie=UTF-8);
- Filtragem de páginas por categoria;

## Tecnologias Utilizadas

### Backend

| Tecnologia                             | Categoria                       |
| -------------------------------------- | ------------------------------- |
| Typescript                             | Linguagem Principal             |
| Express                                | Framework Backend               |
| Drizzle                                | ORM                             |
| Node.js                                | Ambiente de execução javascript |
| Postgress / Supabase                   | Banco de dados                  |
| Axios                                  | Requisições HTTP                |
| Cherrio                                | Tratamento de dados             |
| [Wikijs](https://dijs.github.io/wiki/) | Buscar dados da Wiki do projeto |

### Frontend

| Tecnologia | Categoria                   |
| ---------- | --------------------------- |
| Typescript | Linguagem principal         |
| React      | Biblioteca Javascript       |
| Typescript | Linguagem principal         |
| D3.js      | Simula física no javascript |

---

## Documentação do código

### Backend

#### Rotas

caminho: backend\src\routes\routes.ts

| Metodo | Endpoint | Descrição                                                              |
| ------ | -------- | ---------------------------------------------------------------------- |
| Get    | /        | Retorna todas as Páginas e todas as Conexões                           |
| Post   | /search  | Retorna as páginas mais relevantes de acordo com a pesquisa do usuário |

#### Controller

caminho: backend\src\controller\get-wiki-controller.ts

| Função     | Descrição                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| GetWiki    | Faz a requisição na wiki service e retorna as páginas e as conexões                                   |
| SearchWiki | Busca a pesquisa do usuário e envia para a sematic search service que retorna o resultado da pesquisa |

#### Wiki Service

caminho: backend\src\services\wiki-service.ts

##### Função GetPages

- Busca as paginas em Records vindas da função [GetPages](#função-getpages-1) da [wikiDataManipulationService](#wikidatamanipulationservice);
- separa o processamento de 20 em 20 páginas enviando para o FormatPage;
- envia as páginas já formatadas para: UpdatePagesEmbeddings, para o UpdatePage do repositório e para um array chamado allPagesObjects;
- retorna o array do allPagesObjects;

##### Função FormatPages

- recebe uma página
- busca na getWikiText o texto da página específica, e as categorias daquela página
- limpa o texto da página retirando alguns espaços / caracteres

#### WikiDataManipulationService

caminho: backend\src\services\wiki-data-manipulation-service.ts

##### Função GetPages

Busca da API
