// home busca e adiciona em uma das listas (series, movies, outros)
// listar medias de 3 tipos, serie, movie, outros

// todas as listas terão separação por marcados e desmarcados
// e a opcao de marcar e desmarcar, remover da lista

// componentes,

// media - componente pra o item de serie, filme, outro
// media-list

// fluxo rotas, navegacao

// - Auth -> Home

// - Home -> Serie, Filme, outros

// - Serie, Filme, outro -> Home, Auth

export const mediasMock = [
  {
    id: 1,
    name: 'Media 1',
    genre: 'genre',
    description: 'some descriptions',
    media_type: 'movie',
    added: false,
    watched: false
  },
  {
    id: 2,
    name: 'Media 2',
    genre: 'genre',
    description: 'some descriptions',
    media_type: 'serie',
    added: false,
    watched: false
  },
  {
    id: 3,
    name: 'Media 3',
    genre: 'genre',
    description: 'some descriptions',
    media_type: 'movie',
    added: false,
    watched: false
  },
  {
    id: 4,
    name: 'Media 4',
    genre: 'genre',
    description: 'some descriptions',
    media_type: 'other',
    added: false,
    watched: false
  }
]
