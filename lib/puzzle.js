// Seleciona todos os elementos 'td' da página e os armazena na constante 'tiles'
const tiles = document.querySelectorAll('td');

// Função 'canMove' verifica se um determinado 'tile' (td) pode ser movido para a posição vazia
const canMove = (tile) => {
  // Obtém o índice da coluna do 'tile' clicado
  const tileCol = tile.cellIndex;
  // Obtém o índice da linha do 'tile' clicado através do elemento pai 'tr'
  const tileRow = tile.parentElement.rowIndex;
  // Seleciona o 'tile' vazio, que tem a classe 'empty'
  const empty = document.querySelector('.empty');
  // Obtém o índice da coluna do 'tile' vazio
  const emptyCol = empty.cellIndex;
  // Obtém o índice da linha do 'tile' vazio através do elemento pai 'tr'
  const emptyRow = empty.parentElement.rowIndex;

  // Exibe no console a posição do 'tile' clicado e a posição do 'tile' vazio
  console.log(`Click in ${tileRow},${tileCol} - Empty in ${emptyRow},${emptyCol}`);

  // Retorna 'true' se o 'tile' clicado estiver adjacente ao 'tile' vazio
  // A condição é que o 'tile' deve estar adjacente à célula vazia, seja na horizontal ou na vertical.
  return (
    (tileCol === emptyCol && (tileRow + 1 === emptyRow || tileRow - 1 === emptyRow)) ||
    (tileRow === emptyRow && (tileCol + 1 === emptyCol || tileCol - 1 === emptyCol))
  );
};

// Função 'moveTile' move o 'tile' clicado para a posição vazia
const moveTile = (tile) => {
  // Seleciona o 'tile' vazio, que tem a classe 'empty'
  const empty = document.querySelector('.empty');
  // Remove a classe 'empty' do 'tile' vazio para indicar que ele não está mais vazio
  empty.classList.remove('empty');
  // Adiciona a classe 'empty' ao 'tile' clicado para indicar que ele agora está vazio
  tile.classList.add('empty');
  // Troca o texto entre o 'tile' clicado e o 'tile' vazio
  empty.innerText = tile.innerText;
  tile.innerText = '';
};

// Função 'checkIfPlayerWins' verifica se o jogador organizou os 'tiles' na ordem correta
const checkIfPlayerWins = () => {
  // Cria uma lista vazia para armazenar a posição atual dos 'tiles'
  const positions = [];
  // Itera sobre cada 'tile' e armazena seu valor na lista 'positions'
  tiles.forEach((tile) => {
    positions.push(parseInt(tile.innerText))
  });
  // Se os 'tiles' estiverem na ordem correta, exibe a mensagem de vitória
  if (positions.join(',') === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
    document.querySelector('h1').innerText += " - YOU WIN!!!";
  }
};

// Itera sobre cada 'tile' e adiciona um 'event listener' para o evento de clique
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    // Se o 'tile' clicado puder ser movido, move o 'tile' e verifica se o jogador ganhou
    if (canMove(tile)) {
      console.log('Tile can move');
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
