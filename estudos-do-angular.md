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

  ```
  import { signal } from '@angular/core';

  const count = signal(0);

  count.set(10);
  count.update(v => v + 1);

  console.log(count());
  ```

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

- Effects ( Efeitos ): Não são signals, mas trabalham junto com eles para executar efeitos colaterais reativos.
  Característica: Executam automaticamente quando algum signal usado dentro deles muda.
  - Não armazenam estado.
  - Servem para sincronizar coisas externas ao Angular.
  - Exemplo de uso:
  - salvar no localStorage
  - logs
  - chamadas externas
  - manipulação manual do DOM

  ```
  // sempre que o count for alterado ele irá fazer um console.log do valor atualizado do count()
  effect(() => {
    console.log(count());
  });
  ```

- Linked signals ( Signals Vinculados ): São signals derivados que também podem ser alterados manualmente.
  - **Característica**: Mistura comportamento de signal e computed.
  - Eles conseguem se recalcular automaticamente quando a origem muda, mas ainda permitem .set().
  - Muito úteis quando você precisa de um valor “sincronizado”, mas que o usuário também pode editar.
  - **Exemplo de uso**: Item selecionado em dropdown, abas ativas, formulários dependentes.

  ```
  // um Signal convencional que armazena uma lista (array) de usuários.
  const users = signal(['João', 'Maria']);

  // Define o estado atual de selectedUser como 'João' (o primeiro item da lista atual).
  // Cria um vínculo de dependência com o Signal users.
  const selectedUser = linkedSignal(() => users()[0]);

  //Você atualiza o valor manualmente.
  //Diferente de um computed() (que é estritamente de leitura e derivado), o linkedSignal retorna um WritableSignal (um signal gravável).
  selectedUser.set('Maria');

  // Ao utilizar o `set()` o valor de `selectedUser()` será `Maria`
  ```

- Resource signals ( Signals de Recurso ): São signals voltados para operações assíncronas.
  - **Característica**: Gerenciam automaticamente loading, erro e dados.
  - Funcionam muito bem com APIs HTTP e fetch.
  - O Angular acompanha o estado da requisição de forma reativa.
  - Possuem helpers como:
    - .value()
    - .isLoading()
    - .error()
    - .status()
  - **Exemplo de uso**: Buscar usuários da API, carregar produtos, dados do backend.

  ```
  const userResource = resource({
    params: () => ({ id: 1 }),

    loader: async ({ params }) => {
      const res = await fetch(`/api/users/${params.id}`);
      return res.json();
    }
  });
  ```

- Input signals ( Signals de Entrada ): São inputs reativos para componentes Angular.
  - **Característica**: Substituem o @Input() tradicional.
  - Permitem integração direta com computed e effect.
  - Tornam os componentes mais reativos e previsíveis.
  - Podem ser obrigatórios usando .required().
  - **Exemplo de uso**: Receber dados do componente pai.
  ```
  userId = input.required<number>();
  ```
