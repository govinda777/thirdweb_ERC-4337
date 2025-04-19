## Tutorial Passo a Passo: Criando Carteiras Inteligentes ERC-4337 com Thirdweb (Baseado no Vídeo)

Este tutorial passo a passo detalha como criar carteiras inteligentes ERC-4337 utilizando a plataforma Thirdweb, com base no vídeo fornecido. Cobriremos tanto a implementação simples utilizando o componente de interface do usuário "Connect Wallet" quanto um fluxo mais personalizado com o SDK da Thirdweb.

**O que são Carteiras Inteligentes ERC-4337?**

Carteiras inteligentes ERC-4337 são carteiras de criptomoedas controladas por **contratos inteligentes** em vez de chaves privadas tradicionais. Isso elimina a necessidade de os usuários gerenciarem chaves privadas complexas ou frases de recuperação.

**Funcionalidades das Carteiras Inteligentes Thirdweb:**

As carteiras inteligentes da Thirdweb oferecem diversas funcionalidades, incluindo:

*   **Múltiplos proprietários** por carteira.
*   Execução de **transações únicas e em lote**.
*   Envio e recebimento de **tokens nativos e NFTs** (ERC-721 e ERC-1155).
*   **Transações sem gás (gasless)** através de um "paymaster".
*   Abstração da interação com a blockchain, permitindo **transações sem assinatura** para o usuário final.

### Parte 1: Implementação Simples com o Componente de UI "Connect Wallet"

Esta seção guiará você na implementação de carteiras inteligentes de forma rápida utilizando o componente de interface do usuário (UI) "Connect Wallet" da Thirdweb.

#### Passo 1: Implantação do Contrato de Fábrica de Contas (Account Factory)

Esta etapa é feita através do **navegador**, utilizando o painel da Thirdweb.

1.  Acesse o **dashboard da Thirdweb** ().
2.  **Conecte sua carteira** ao dashboard.
3.  Navegue até a seção de **"Contracts"** e clique em **"Deploy new contract"**.
4.  Na seção de populares ou procurando por "smart wallets", localize e selecione o contrato **"Account Factory"**. Este é um contrato básico necessário para criar as contas dos seus smart wallets.
5.  Selecione a rede onde você deseja implantar o contrato. Para demonstração, o vídeo utiliza a **rede Mumbai**. Clique em **"Deploy Now"**.
6.  Confirme as transações necessárias em sua carteira para implantar o contrato.
7.  Após a implantação, **copie o endereço do contrato Account Factory**. Você precisará dele posteriormente.

#### Passo 2: Configuração da Chave de API Thirdweb

Esta etapa também é feita através do **navegador**, no painel da Thirdweb.

1.  No dashboard da Thirdweb, vá para a seção de **"Settings"** e clique em **"API Keys"**.
2.  Clique em **"Create API Key"** para criar uma nova chave. Dê um nome para sua chave (por exemplo, "smart-wallet-demo") e clique em **"Next"**.
3.  Na seção de permissões, você pode escolher entre acesso irrestrito ou especificar com quais contratos os smart wallets podem interagir. Para maior segurança ao usar transações sem gás, é recomendado **especificar os contratos**.
4.  Para a demonstração, **adicione os endereços dos contratos de NFT (ERC-1155)** e de token (ERC-20) que você pretende usar para permitir interações sem gás com eles. Você pode implantar seus próprios contratos ou usar contratos de teste existentes.
5.  Na seção de domínios, você pode restringir o uso da chave de API a domínios específicos. Para teste local, você pode adicionar `http://localhost:3000`.
6.  Clique em **"Create"**. **Salve a "Client ID"** gerada, pois você precisará dela no seu aplicativo. A "Secret Key" é mostrada apenas uma vez, então certifique-se de guardá-la em um local seguro.
7.  Observe que para habilitar smart wallets na **rede principal (Mainnet)** e utilizar transações sem gás, você precisará adicionar um método de pagamento na seção de "Account and Billing" do painel da Thirdweb.

#### Passo 3: Criação de um Novo Projeto React (Linha de Comando)

1.  Abra seu **terminal** ou prompt de comando.
2.  Execute o seguinte comando para criar um novo aplicativo React utilizando a CLI da Thirdweb:

    ```bash
    npx thirdweb create app --evm --framework next --typescript smart-wallet-simple
    ```

    Substitua `smart-wallet-simple` pelo nome desejado para o seu projeto.
3.  Navegue até o diretório do projeto criado:

    ```bash
    cd smart-wallet-simple
    ```
4.  Abra o projeto em seu **editor de código** (por exemplo, Visual Studio Code).

#### Passo 4: Configuração do Aplicativo para Smart Wallets (Editor de Código)

1.  Abra o arquivo **`_app.tsx`** localizado na pasta `pages`.
2.  Modifique a configuração do `ThirdwebProvider`:
    *   Altere a propriedade `activeChain` para a rede onde você implantou o contrato Account Factory (por exemplo, `Mumbai`).
    *   Localize a propriedade `clientId` e substitua o valor padrão pela **Client ID da sua chave de API Thirdweb**. Você pode armazenar essa Client ID em um arquivo `.env.local` e acessá-la através de variáveis de ambiente (conforme mostrado no vídeo). Crie um arquivo `.env.local` na raiz do seu projeto e adicione:

        ```
        NEXT_PUBLIC_TEMPLATE_CLIENT_ID=SEU_CLIENT_ID
        ```

        Em seguida, atualize `_app.tsx`:

        ```typescript jsx
        import { ThirdwebProvider } from '@thirdweb-dev/react';
        import type { AppProps } from 'next/app';
        import { Mumbai } from '@thirdweb-dev/chains';

        function MyApp({ Component, pageProps }: AppProps) {
          return (
            <ThirdwebProvider activeChain={Mumbai} clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}>
              <Component {...pageProps} />
            </ThirdwebProvider>
          );
        }

        export default MyApp;
        ```
    *   Adicione a propriedade `supportedWallets` para configurar o suporte a smart wallets. Dentro de um array, adicione um objeto para `smartWallet` com as seguintes configurações:
        *   `factoryAddress`: Defina este valor com o **endereço do contrato Account Factory** que você copiou no Passo 1.
        *   `gasless`: Defina como `true` para habilitar transações sem gás.
    *   Adicione a propriedade `personalWallets` para especificar quais carteiras podem ser usadas como a carteira pessoal (EOA) por trás do smart wallet. Para usar a **carteira Paper (baseada em e-mail)**, adicione um objeto para `paperWallet` com a propriedade `paperClientId` configurada com o seu **Paper Client ID**. Você pode obter este ID no dashboard da Paper (, acesse [paper.xyz](https://paper.xyz/), faça login, vá em "Off Settings" e copie o "Client ID").

        ```typescript jsx
        import { ThirdwebProvider, smartWallet, paperWallet } from '@thirdweb-dev/react';
        import type { AppProps } from 'next/app';
        import { Mumbai } from '@thirdweb-dev/chains';

        function MyApp({ Component, pageProps }: AppProps) {
          return (
            <ThirdwebProvider
              activeChain={Mumbai}
              clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
              supportedWallets={[
                smartWallet({ factoryAddress: 'SEU_ENDEREÇO_DA_FACTORY', gasless: true }),
              ]}
              personalWallets={[
                paperWallet({ clientId: 'SEU_PAPER_CLIENT_ID' }),
              ]}
            >
              <Component {...pageProps} />
            </ThirdwebProvider>
          );
        }

        export default MyApp;
        ```

        **Substitua `'SEU_ENDEREÇO_DA_FACTORY'` e `'SEU_PAPER_CLIENT_ID'` pelos seus valores reais.**

#### Passo 5: Implementação do Componente "Connect Wallet" (Editor de Código)

1.  Abra o arquivo **`index.tsx`** localizado na pasta `pages`.
2.  Remova o código boilerplate existente e adicione o componente `<ConnectWallet>` da Thirdweb:

    ```typescript jsx
    import { ConnectWallet } from "@thirdweb-dev/react";
    import styles from "../styles/Home.module.css";

    export default function Home() {
      return (
        <div className={styles.container}>
          <main className={styles.main}>
            <h1>My Awesome Web3 App</h1>
            <ConnectWallet />
          </main>
        </div>
      );
    }
    ```

#### Passo 6: Teste da Implementação Simples (Navegador)

1.  Execute o aplicativo React no seu terminal:

    ```bash
    yarn dev
    ```

2.  Abra o aplicativo no seu navegador (geralmente em `http://localhost:3000`).
3.  Você deverá ver um botão **"Connect Wallet"**.
4.  Clique no botão **"Connect Wallet"**. Uma janela modal deverá aparecer com a opção de conectar usando um e-mail (carteira Paper).
5.  **Insira seu e-mail** e clique em **"Continue"**.
6.  Você receberá um **código OTP** (One-Time Password) no seu e-mail. Insira este código no modal.
7.  Uma **carteira Paper será criada e conectada** como a EOA para o seu smart wallet. O smart wallet será o endereço conectado à sua aplicação.
8.  Para testar as transações sem gás, você pode adicionar um botão para interagir com um dos contratos (NFT ou token) que você permitiu na configuração da sua chave de API. Por exemplo, você pode adicionar um botão para reivindicar um NFT (se o contrato permitir). Ao interagir com este botão através do smart wallet, a transação deverá ser **realizada sem a necessidade de assinatura e sem custos de gás** para o usuário. Você pode verificar o resultado da transação (por exemplo, o aumento do suprimento de um NFT reivindicado) no contrato através de um explorador de blockchain.

### Parte 2: Implementação com Fluxo Personalizado e SDK

Esta seção mostrará como criar um fluxo de usuário mais personalizado e imersivo utilizando o SDK da Thirdweb para smart wallets. O exemplo demonstrado no vídeo utiliza uma "local wallet" (carteira criptografada localmente com uma senha).

#### Passo 7: Criação de um Novo Projeto React (Linha de Comando)

1.  Abra seu **terminal**.
2.  Execute o seguinte comando para criar um novo aplicativo React:

    ```bash
    npx thirdweb create app --evm --framework next --typescript smart-wallet-to-monsters
    ```

    Substitua `smart-wallet-to-monsters` pelo nome desejado.
3.  Navegue até o diretório do projeto:

    ```bash
    cd smart-wallet-to-monsters
    ```
4.  Abra o projeto no seu **editor de código**.

#### Passo 8: Configuração Básica (Editor de Código)

1.  Abra o arquivo **`_app.tsx`** na pasta `pages`.
2.  Altere a propriedade `activeChain` no `ThirdwebProvider` para **`Mumbai`**. Certifique-se de adicionar o `clientId` da sua chave de API da mesma forma que na implementação simples, utilizando um arquivo `.env.local`.

    ```typescript jsx
    import { ThirdwebProvider } from '@thirdweb-dev/react';
    import type { AppProps } from 'next/app';
    import { Mumbai } from '@thirdweb-dev/chains';

    function MyApp({ Component, pageProps }: AppProps) {
      return (
        <ThirdwebProvider activeChain={Mumbai} clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      );
    }

    export default MyApp;
    ```

#### Passo 9: Criação do Arquivo de Configuração de Endereços (Editor de Código)

1.  Crie uma nova pasta chamada **`const`** na raiz do seu projeto.
2.  Dentro da pasta `const`, crie um novo arquivo chamado **`addresses.ts`**.
3.  Neste arquivo, armazene os **endereços do seu contrato Account Factory, do contrato de NFT (monstros) e do contrato de token (ERC-20)** como constantes.

    ```typescript
    export const ACCOUNT_FACTORY_ADDRESS = 'SEU_ENDEREÇO_DA_FACTORY';
    export const MONSTER_CONTRACT_ADDRESS = 'SEU_ENDEREÇO_DO_CONTRATO_NFT';
    export const TOKEN_CONTRACT_ADDRESS = 'SEU_ENDEREÇO_DO_CONTRATO_TOKEN';
    ```

    **Substitua os valores pelos seus endereços de contrato.**

#### Passo 10: Criação do Componente de Login (Editor de Código)

1.  Crie uma nova pasta chamada **`components`** na raiz do seu projeto.
2.  Dentro da pasta `components`, crie um novo arquivo chamado **`login.tsx`**.
3.  Crie um componente funcional `Login` com os seguintes estados utilizando `useState`:
    *   `password`: Para armazenar a senha inserida pelo usuário.
    *   `loadingStatus`: Para exibir mensagens de status durante o processo de login.
    *   `isLoading`: Um booleano para indicar se o processo de login está em andamento.
    *   `signer`: Para armazenar o signer (provedor de assinatura) após a conexão da carteira.
4.  No componente `Login`, renderize um formulário com um campo de entrada de senha e um botão de login. Vincule a alteração do campo de entrada ao estado `password` e defina uma função `connectWallet` a ser chamada quando o botão de login for clicado.
5.  Crie também uma lógica para renderizar um componente `Connected` (que será criado posteriormente) se o `signer` estiver definido, e uma mensagem de carregamento se `isLoading` for verdadeiro.

#### Passo 11: Criação das Funções de Carteira (`lib/wallet.ts` - Editor de Código)

1.  Crie uma nova pasta chamada **`lib`** na raiz do seu projeto.
2.  Dentro da pasta `lib`, crie um novo arquivo chamado **`wallet.ts`**.
3.  **`createSmartWallet` Function:** Crie uma função chamada `createSmartWallet` que recebe as configurações necessárias (rede, endereço da fábrica, habilitar gasless, client ID) e retorna uma instância de um novo smart wallet da Thirdweb SDK.

    ```typescript
    import { ThirdwebSDK } from '@thirdweb-dev/sdk';
    import { Mumbai } from '@thirdweb-dev/chains';
    import { SmartWallet } from '@thirdweb-dev/wallets';
    import { ACCOUNT_FACTORY_ADDRESS } from '../const/addresses';

    export const createSmartWallet = (clientId: string) => {
      return new SmartWallet({
        chain: Mumbai,
        factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        gasless: true,
        clientId,
      });
    };
    ```

4.  **`connectSmartWallet` Function:** Crie uma função assíncrona chamada `connectSmartWallet` que recebe a senha e uma função de callback para atualizar o status. Esta função fará o seguinte:
    *   Criar ou carregar uma **"local wallet"** utilizando a senha fornecida como chave de criptografia.
    *   Criar uma instância do smart wallet utilizando a função `createSmartWallet`.
    *   **Conectar o smart wallet à "local wallet"** como sua carteira pessoal (EOA).
    *   Verificar se o **contrato do smart wallet já foi implantado** (o que indica se já passou por uma transação). Isso pode ser feito verificando se há código no endereço do smart wallet.
    *   Se o smart wallet **não estiver implantado** (é uma nova conta), implementar a lógica para enviar um NFT inicial e alguns tokens para o novo smart wallet utilizando **transações em lote**. Isso envolve preparar as chamadas de função para reivindicar os NFTs e tokens e, em seguida, executar essas chamadas em lote através do smart wallet.
    *   Retornar o signer do smart wallet conectado.

    ```typescript
    import { ThirdwebSDK } from '@thirdweb-dev/sdk';
    import { Mumbai } from '@thirdweb-dev/chains';
    import { SmartWallet, LocalWallet } from '@thirdweb-dev/wallets';
    import { ACCOUNT_FACTORY_ADDRESS, MONSTER_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from '../const/addresses';

    export const createSmartWallet = (clientId: string) => { /* ... */ };

    export const connectSmartWallet = async (
      password: string,
      setLoadingStatus: (status: string) => void,
      clientId: string
    ) => {
      setLoadingStatus('Searching for trainer account...');

      const smartWallet = createSmartWallet(clientId);
      const personalWallet = new LocalWallet();

      await personalWallet.loadOrCreate({
        strategy: 'encryptedJson',
        password,
      });

      await smartWallet.connect({ personalWallet });

      const sdk = new ThirdwebSDK(smartWallet, { clientId });
      const walletAddress = await smartWallet.getAddress();
      const provider = sdk.getProvider();
      const code = await provider.getCode(walletAddress);
      const isDeployed = code !== '0x';

      if (!isDeployed) {
        setLoadingStatus('New account detected. Creating new account...');
        const monsterContract = await sdk.getContract(MONSTER_CONTRACT_ADDRESS);
        const tokenContract = await sdk.getContract(TOKEN_CONTRACT_ADDRESS);

        const claimNftTransaction = await monsterContract.erc1155.claim(0, 1);
        const claimTokensTransaction = await tokenContract.erc20.claim(10);

        setLoadingStatus('Sending starter monster and initial funds...');
        const batchTransaction = await smartWallet.executeBatch([
          claimNftTransaction,
          claimTokensTransaction,
        ]);
        await batchTransaction.wait();
        setLoadingStatus('Starter pack sent!');
      } else {
        setLoadingStatus('Trainer account found. Loading monsters...');
      }

      return await smartWallet.getSigner();
    };
    ```

#### Passo 12: Implementação da Função `connectWallet` no Componente de Login (Editor de Código)

1.  No arquivo **`login.tsx`**, importe a função `connectSmartWallet` de `lib/wallet.ts`.
2.  Implemente a função assíncrona `connectWallet` que será chamada ao clicar no botão de login. Esta função deverá:
    *   Definir `isLoading` como `true`.
    *   Chamar a função `connectSmartWallet` passando a senha inserida, a função para atualizar `loadingStatus` e o `clientId`.
    *   Obter o signer retornado por `connectSmartWallet`.
    *   Atualizar o estado `signer` com o signer obtido.
    *   Definir `isLoading` como `false`.
    *   Implemente tratamento de erros com um bloco `try...catch`.

#### Passo 13: Criação do Componente `Connected` (Editor de Código)

1.  Crie um novo arquivo chamado **`connected.tsx`** na pasta `components`.
2.  Crie um componente funcional `Connected` que recebe o `signer` como prop.
3.  Dentro deste componente, configure o `ThirdwebProvider` utilizando o `signer` recebido, a rede (Mumbai) e o `clientId`.
4.  Renderize o componente `UserProfile` (que será criado no próximo passo) dentro do `Connected` component.

    ```typescript jsx
    import { ThirdwebProvider } from '@thirdweb-dev/react';
    import { Mumbai } from '@thirdweb-dev/chains';
    import { UserProfile } from './profile';

    interface ConnectedProps {
      signer: any; // Ou o tipo correto do Signer
    }

    export const Connected: React.FC<ConnectedProps> = ({ signer }) => {
      return (
        <ThirdwebProvider signer={signer} activeChain={Mumbai} clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}>
          <UserProfile />
        </ThirdwebProvider>
      );
    };
    ```

#### Passo 14: Criação do Componente `NavBar` (Editor de Código)

1.  Crie um novo arquivo chamado **`NavBar.tsx`** na pasta `components`.
2.  Crie um componente funcional simples `NavBar` que exibe o título do aplicativo (por exemplo, "tww monsters").

#### Passo 15: Criação do Componente `UserProfile` (Editor de Código)

1.  Crie um novo arquivo chamado **`profile.tsx`** na pasta `components`.
2.  Crie um componente funcional `UserProfile`. Utilize os hooks do Thirdweb SDK como `useAddress`, `useContract`, `useOwnedNFTs` e `useTokenBalance` para buscar os dados do usuário conectado (endereço do smart wallet, saldo de tokens, NFTs possuídos).
3.  Implemente um modal de "loja" que permite aos usuários reivindicarem mais NFTs utilizando um componente `<Web3Button>` configurado com a função de reivindicação do contrato de NFT. A lógica para transações sem gás também se aplica aqui.
4.  Renderize as informações do perfil do usuário, incluindo o endereço da carteira, o saldo de tokens e os NFTs possuídos. Inclua a funcionalidade para abrir o modal da loja e reivindicar mais NFTs.

#### Passo 16: Teste do Fluxo Personalizado (Navegador)

1.  Execute o aplicativo React no seu terminal:

    ```bash
    yarn dev
    ```

2.  Abra o aplicativo no seu navegador.
3.  Você deverá ver o componente de login com um campo para inserir uma senha.
4.  **Se for a primeira vez** com uma determinada senha, ao inseri-la e clicar em "Login", um **novo smart wallet será criado**, e um NFT inicial e tokens serão automaticamente enviados para ele (graças à lógica de transação em lote implementada em `connectSmartWallet`).
5.  Após a criação e o envio dos ativos iniciais, o **perfil do usuário será exibido**, mostrando o saldo de tokens e o NFT inicial.
6.  Você poderá interagir com a funcionalidade da loja para reivindicar mais NFTs. Essas transações deverão ser **sem gás e sem necessidade de assinatura**.

#### Passo 17: Verificação no Contrato Account Factory (Navegador)

1.  Volte para o **dashboard da Thirdweb** e selecione o contrato **Account Factory** que você implantou.
2.  Na seção de "Accounts" do painel do contrato, você poderá visualizar e gerenciar as contas de smart wallets criadas durante a demonstração (tanto as criadas com a carteira Paper quanto as criadas com a "local wallet").

### Conclusão

Este tutorial demonstrou como criar carteiras inteligentes ERC-4337 utilizando a plataforma Thirdweb, tanto de forma simples com o componente "Connect Wallet" quanto através de um fluxo personalizado com o SDK. As carteiras inteligentes ERC-4337 oferecem uma experiência de usuário mais intuitiva e segura, abrindo novas possibilidades para aplicações web3. Ao abstrair a complexidade da gestão de chaves privadas e permitir funcionalidades como transações sem gás, as carteiras inteligentes contribuem para a adoção em massa da tecnologia blockchain.
