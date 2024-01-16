class Usuario {
    constructor(id, nome, enderecoContato, historicoReservas) {
      this.id = id;
      this.nome = nome;
      this.enderecoContato = enderecoContato;
      this.historicoReservas = historicoReservas || [];
    }
  }
  
  class Propriedade {
    constructor(id, nome, endereco, capacidadeHospedes, numeroQuartos, precoPorNoite, disponibilidade) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.capacidadeHospedes = capacidadeHospedes;
      this.numeroQuartos = numeroQuartos;
      this.precoPorNoite = precoPorNoite;
      this.disponibilidade = disponibilidade || true;
    }
  }
  
  class Reserva {
    constructor(id, idPropriedade, idUsuario, checkIn, checkOut, valorTotal, statusPagamento) {
      this.id = id;
      this.idPropriedade = idPropriedade;
      this.idUsuario = idUsuario;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.valorTotal = valorTotal;
      this.statusPagamento = statusPagamento || "Pendente";
    }
  }
  
  
  
    class Anuncio {
    constructor(id, idProprietario, idPropriedade, titulo, descricao, status) {
      this.id = id;
      this.idProprietario = idProprietario;
      this.idPropriedade = idPropriedade;
      this.titulo = titulo;
      this.descricao = descricao;
      this.status = status;
    }
  }
  
  const readlineSync = require('readline-sync');

  // Array para armazenar usuários, propriedades, reservas e anúncios

  // aqui eu tirei a antiga classe de sistemas para o código ficar mais simples 

  const usuarios = [];
  const propriedades = [];
  const reservas = [];
  const anuncios = [];
  
  // Função para fazer login 
  function fazerLogin(nomeUsuario) {
    const usuarioLogado = usuarios.find((user) => user.nome === nomeUsuario);
  
    if (usuarioLogado) {
      console.log(`Bem-vindo ao nosso app da Pousada Eclipse, ${nomeUsuario}!`);
      return usuarioLogado;
    } else {
      console.log("Usuário novo encontrado.");
      return null;
    }
  }
  
  // Função para cadastrar um  usuário
  function fazerCadastro(nomeUsuario, enderecoContato) {
    const novoUsuario = {
      id: usuarios.length + 1,
      nome: nomeUsuario,
      enderecoContato: enderecoContato,
      historicoReservas: []
    };
  
    usuarios.push(novoUsuario);
    console.log("Cadastro concluído!");
    return novoUsuario;
  }
  
  // Função para visualizar os dados do usuário logado
  function verMeusDados(usuarioLogado) {
    if (!usuarioLogado) {
      console.log("Nenhum usuário logado.");
      return;
    }
    console.log(`Meus Dados - ID: ${usuarioLogado.id}, Nome: ${usuarioLogado.nome}, Endereço de Contato: ${usuarioLogado.enderecoContato}`);
  }
  
  // Função para modificar os dados do usuário logado
  function modificarMeusDados(usuarioLogado, novosDados) {
    if (!usuarioLogado) {
      console.log("Nenhum usuário logado.");
      return;
    }
  
    usuarioLogado.nome = novosDados.nome || usuarioLogado.nome;
    usuarioLogado.enderecoContato = novosDados.enderecoContato || usuarioLogado.enderecoContato;
    console.log("Dados modificados com sucesso!");
  }
  
  // Função para ver a lista de reservas em ordem cronológica
  function verListaReservasOrdemCronologica(reservas) {
    if (reservas.length === 0) {
      console.log("Nenhuma reserva encontrada.");
      return;
    }
  
    const reservasOrdenadas = reservas.slice().sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
    console.log("Lista de Reservas (Ordem Cronológica):");
    reservasOrdenadas.forEach((reserva) => {
      console.log(`ID: ${reserva.id}, Check-in: ${reserva.checkIn}, Check-out: ${reserva.checkOut}`);
    });
  }
  
  // Função para adicionar uma nova propriedade
  function adicionarPropriedade(novaPropriedade) {
    propriedades.push(novaPropriedade);
    console.log("Propriedade adicionada com sucesso!");
  }
  
  // Função para excluir uma propriedade
  function excluirPropriedade(idPropriedade) {
    const propriedadeSelecionada = propriedades.find((propriedade) => propriedade.id === idPropriedade);
  
    if (propriedadeSelecionada) {
      const reservasAssociadas = reservas.some((reserva) => reserva.idPropriedade === idPropriedade);
  
      if (reservasAssociadas) {
        console.log("Não é possível excluir a propriedade, pois há reservas associadas.");
      } else {
        propriedades = propriedades.filter((propriedade) => propriedade.id !== idPropriedade);
        anuncios = anuncios.filter((anuncio) => anuncio.idPropriedade !== idPropriedade);
        console.log("Propriedade e anúncios associados excluídos com sucesso.");
      }
    } else {
      console.log("Propriedade não encontrada.");
    }
  }
  
  // Função para fazer um anúncio
  function fazerAnuncio(usuarioLogado, idPropriedade, titulo, descricao, status) {
    const novoAnuncio = {
      id: anuncios.length + 1,
      idProprietario: usuarioLogado.id,
      idPropriedade: idPropriedade,
      titulo: titulo,
      descricao: descricao,
      status: status
    };
  
    anuncios.push(novoAnuncio);
    console.log("Anúncio criado com sucesso!");
  }
  
  // Função para excluir um anúncio
  function excluirAnuncio(idAnuncio) {
    const anuncioSelecionado = anuncios.find((anuncio) => anuncio.id === idAnuncio);
  
    if (anuncioSelecionado) {
      anuncios = anuncios.filter((anuncio) => anuncio.id !== idAnuncio);
      console.log("Anúncio excluído com sucesso.");
    } else {
      console.log("Anúncio não foi encontrado.");
    }
  }
  
  function avaliarEstadia(usuarioLogado, idReserva) {
    const reserva = usuarioLogado.historicoReservas.find((reserva) => reserva.id === idReserva);
  
    if (reserva) {
      const avaliacao = readlineSync.question("Digite sua avaliação para esta estadia: ");
      reserva.avaliacao = avaliacao;
      console.log("Avaliação registrada com sucesso!");
    } else {
      console.log("Reserva não encontrada no histórico.");
    }
  }

 // Função para visualizar avaliações de uma propriedade
  function visualizarAvaliacoes(propriedade) {
    const reservasPropriedade = reservas.filter((reserva) => reserva.idPropriedade === propriedade.id && reserva.avaliacao);
  
    if (reservasPropriedade.length > 0) {
      console.log("Avaliações para esta propriedade:");
      reservasPropriedade.forEach((reserva) => {
        console.log(`Reserva ID: ${reserva.id}, Avaliação: ${reserva.avaliacao}`);
      });
    } else {
      console.log("Nenhuma avaliação encontrada para esta propriedade.");
    }
  }
  
  
  
  
  // Função para ver a lista de anúncios
  function verListaAnuncios() {
    console.log("Lista de anúncios:");
    anuncios.forEach((anuncio) => {
      console.log(`ID: ${anuncio.id}, Título: ${anuncio.titulo}, Descrição: ${anuncio.descricao}`);
    });
  }
  
  // Função para ver a lista de propriedades
  function verListaPropriedades() {
    console.log("Lista de propriedades:");
    propriedades.forEach((propriedade) => {
      console.log(`ID: ${propriedade.id}, Nome: ${propriedade.nome}`);
    });
  }
  
  // Função para reservar uma propriedade
  function reservarPropriedade(usuarioLogado, idPropriedade, checkIn, checkOut) {
    const propriedadeSelecionada = propriedades.find((propriedade) => propriedade.id === idPropriedade);
  
    if (propriedadeSelecionada) {
      const novaReserva = {
        id: reservas.length + 1,
        idPropriedade: propriedadeSelecionada.id,
        idUsuario: usuarioLogado.id,
        checkIn: checkIn,
        checkOut: checkOut,
        valorTotal: propriedadeSelecionada.precoPorNoite,
        statusPagamento: "Pendente"
      };
  
      reservas.push(novaReserva);
      console.log("Reserva realizada com sucesso!");
    } else {
      console.log("Propriedade não encontrada.");
    }
  }
  
  //  (  Interação com o usuário )
  console.log("Bem-vindo ao app da Pousada Eclipse!");
  
  const respostaCadastro = readlineSync.question("Você já possui cadastro? (sim ou nao): ");
  
  let usuarioLogado;
  
  if (respostaCadastro.toLowerCase() === "sim") {
    const nomeUsuario = readlineSync.question("Digite seu usuario: ");
    usuarioLogado = fazerLogin(nomeUsuario);
  
    if (!usuarioLogado) {
      console.log("Usuario não encontrado.");
    } else {
      console.log(`Bem-vindo de volta, ${nomeUsuario}!`);
    }
  } else if (respostaCadastro.toLowerCase() === "nao") {
    const novoNomeUsuario = readlineSync.question("Digite um novo usuario: ");
    const enderecoContato = readlineSync.question("Digite seu endereço de contato: ");
  
    usuarioLogado = fazerCadastro(novoNomeUsuario, enderecoContato);
  
    console.log(`Cadastro concluido para ${novoNomeUsuario}!`);
  }
  
  if (usuarioLogado) {
    let opcao;
  
    while (opcao !== 9) {
      console.log("\nEscolha uma opção:");
      console.log("1. Ver lista de propriedades");
      console.log("2. Reservar propriedade");
      console.log("3. Ver meus dados");
      console.log("4. Modificar meus dados");
      console.log("5. Ver lista de reservas");
      console.log("6. Fazer um anúncio");
      console.log("7. Ver lista de anúncios");
      console.log("8. Avaliar estadia");
      console.log("9. Visualizar avaliações da propriedade");
      console.log("10. Sair");
  
      opcao = parseInt(readlineSync.question("Digite o número da opçao desejada:"));
  
      switch (opcao) {
        case 1:
          verListaPropriedades();
          break;
        case 2:
          const idPropriedade = parseInt(readlineSync.question("Digite o ID da propriedade que deseja reservar:"));
          const checkIn = readlineSync.question("Digite a data de check-in (formato: YYYY-MM-DD):");
          const checkOut = readlineSync.question("Digite a data de check-out (formato: YYYY-MM-DD):");
          reservarPropriedade(usuarioLogado, idPropriedade, checkIn, checkOut);
          break;
        case 3:
          verMeusDados(usuarioLogado);
          break;
        case 4:
          const novosDados = {};
          novosDados.nome = readlineSync.question("Digite seu novo nome (ou pressione Enter para manter o atual):");
          novosDados.enderecoContato = readlineSync.question("Digite seu novo endereço de contato (ou pressione Enter para manter o atual):");
          modificarMeusDados(usuarioLogado, novosDados);
          break;
        case 5:
          verListaReservasOrdemCronologica(usuarioLogado.historicoReservas);
          break;
        case 6:
          const idPropriedadeAnuncio = parseInt(readlineSync.question("Digite o ID da propriedade para fazer um anuncio:"));
          const tituloAnuncio = readlineSync.question("Digite o titulo do anuncio:");
          const descricaoAnuncio = readlineSync.question("Digite a descriçao do anuncio:");
          const statusAnuncio = readlineSync.question("Digite o status do anuncio:");
          fazerAnuncio(usuarioLogado, idPropriedadeAnuncio, tituloAnuncio, descricaoAnuncio, statusAnuncio);
          break;
        case 7:
          verListaAnuncios();
          break;
          case 8:
            const idReservaAvaliacao = parseInt(readlineSync.question("Digite o ID da reserva que deseja avaliar:"));
            avaliarEstadia(usuarioLogado, idReservaAvaliacao);
            break;
    
          case 9:
            const idPropriedadeAvaliacoes = parseInt(readlineSync.question("Digite o ID da propriedade para ver as avaliações:"));
            const propriedadeAvaliacoes = propriedades.find((propriedade) => propriedade.id === idPropriedadeAvaliacoes);
    
            if (propriedadeAvaliacoes) {
              visualizarAvaliacoes(propriedadeAvaliacoes);
            } else {
              console.log("Propriedade não encontrada.");
            }
            break;
    
          case 10:
            console.log("Saindo do programa. Até logo!");
            break;
    
          default:
            console.log("Opção inválida. Tente novamente.");
        }
      }
    }


      
      