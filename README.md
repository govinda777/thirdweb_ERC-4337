npm install @thirdweb-dev/react@latest @thirdweb-dev/sdk@latest --repository=https://npm.pkg.github.com/

> [!Important]  
> Este repositório fazia referência originalmente à rede testnet `mumbai`.
> 
> A rede `Mumbai` [foi descontinuada desde 08/04/2024](https://blog.thirdweb.com/deprecation-of-mumbai-testnet/), portanto o código neste repositório precisará ser adaptado para funcionar.
>
> Para utilizar este projeto, você precisará substituir todas as referências à rede `mumbai` para `sepolia`, que é a rede testnet recomendada atualmente para Ethereum.

## Account Abstraction ERC4337 Smart Wallet Tutorial

[Account Abstraction ERC4337 - Build your own smart wallets quick and simple](https://youtu.be/xmz7c7rl9cM)

Aprenda como implementar carteiras inteligentes ERC4337 em seu aplicativo. Faça isso rápido e fácil com o componente ConnectWallet UI ou aprenda a criar seu próprio fluxo de login e aproveite os recursos oferecidos pelas carteiras inteligentes.

## Migrando de Mumbai para Sepolia

Para migrar este projeto de Mumbai para Sepolia, siga estas etapas:

1. Substitua todas as importações de Mumbai para Sepolia em seus arquivos:
   ```typescript
   // Antes
   import { Mumbai } from '@thirdweb-dev/chains';
   
   // Depois
   import { Sepolia } from '@thirdweb-dev/chains';
   ```

2. Atualize todas as referências à rede nas configurações do ThirdwebProvider:
   ```typescript
   // Antes
   <ThirdwebProvider activeChain={Mumbai} clientId={process.env.THIRDWEB_CLIENT_ID}>
   
   // Depois
   <ThirdwebProvider activeChain={Sepolia} clientId={process.env.THIRDWEB_CLIENT_ID}>
   ```

3. Reimplante os contratos Account Factory na rede Sepolia através do dashboard da Thirdweb.

4. Atualize as chaves de API para incluir permissões para a rede Sepolia.

## Environment Variables

Para executar este projeto, você precisará adicionar variáveis de ambiente. Verifique o arquivo `.env.example` para todas as variáveis de ambiente necessárias e adicione-as ao arquivo `.env.local` ou configure-as em seu provedor de hospedagem.

## Deploy to IPFS

Implante uma cópia do seu aplicativo no IPFS usando o seguinte comando:

```bash
yarn deploy
```

## Learn More

Para saber mais sobre thirdweb e Next.js, consulte os seguintes recursos:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - aprenda sobre nosso SDK React.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - aprenda sobre nosso SDK JavaScript/TypeScript.
- [thirdweb Portal](https://docs.thirdweb.com) - consulte nossos guias e recursos de desenvolvimento.
- [Next.js Documentation](https://nextjs.org/docs) - aprenda sobre recursos e API do Next.js.
- [Templates](https://thirdweb.com/templates)

Você pode conferir [a organização GitHub do thirdweb](https://github.com/thirdweb-dev) - seu feedback e contribuições são bem-vindos!

## Join our Discord!

Para quaisquer perguntas ou sugestões, junte-se ao nosso discord em [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
