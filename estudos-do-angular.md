# Estudos do Angular

> Isso já sabemos mas é sempre bom relembrar

- Seguindo as boas práticas do angular(recomendado), é sempre tentar manter os seus componente em tamanhos pequenos para facilitar na manutenção e também na realização de testes. Pois em componentes menores se torna mais fácil de realizar testes e de dar manutenção.

### Vitest

> O modo Watch: Ele monitora as mudanças nos arquivos. Se um teste falha, o processo do terminal não se encerra. Ele fica aguardando a correção do código. E assim que salvar qualquer alteração no arquivo `.spec`(ou no código uqe ele esta testando), ele percebe a mudança e roda novamente apenas os testes afetados

### Boas Práticas

- Caso você tenha qualquer váriavel que será somente utilizada para exibir no html, é aconselhado é declarar aquela váriavel como `protected`:

  > Ex: protected title = 'Hello World!'; ou protected title = signals('Hello World!');

- Pois como sabemos as váriaveis publicas podem ser acessadas fora do componente, as váriaveis privadas só podem ser acessadas dentro do componente e as váriaveis protegidas podem ser acessada por outras classes que extenden a classe que esta váriavel protegida está

### Signals

> Na versão 21+ o Angular removeu o zone.js. Pois o signals() substituiu a utilização do zone.js

- Ele guarda os dados do componente, e 'avisam' o angular automaticamente sempre que o valor de dentro muda. Garantindo que a UI (User Interface) seja atualizada de forma mais rápida.
- Com o Signals, o angular sae exatamente quem mudou e atualiza sómente aquela parte que foi alterada, diferente do zone.js que atualizava todas as informações
- Exemplos de uso do signals:
  - **Para criar**: Atribuir o valor inicial: `idade = signal(25);`
  - **Para ler no HTML**: Mantem a mesma lógica da interpolação: `{{ idade() }}`
  - **Para atualizar (somando ou subtraindo)**: Usando o `.update()`: `this.idade.update(valor => valor + 1)`
  - **Para substituir direto (valor fixo)**: Usando o `.set()`: `this.idade.set(30)`

## Tipos de signals:

- Writable signals ( Signals Editáveis ): ele guarda um valor que você pode ler e modificar a qualquer momento.
  - **Característica**: Você tem total controle sobre ele.
  - **Como alterar**: Usando .set() (novo valor) ou .update()
- Computed signals ( Signals Computados ): Ele é criado a partir de um ou mais Signals comuns e calcula seu valor sozinho.
  - **Característica**: Ele é apenas para leitura (read-only). Você não pode usar .set() ou .update() nele.
  - Se o Signal original mudar, o Computed percebe e se atualiza automaticamente, mas apenas se alguém estiver olhando para ele.
  - **Exemplo de uso**: O preço total do carrinho (quantidade \* preço do produto).

  ```
  const preco = signal(10);
  const quantidade = signal(2);

  // O total se calcula sozinho:
  const total = computed(() => preco() * quantidade());
  // Se 'quantidade' mudar para 3, o 'total' vira 30 automaticamente.
  ```

- Effects ( Efeitos ):
