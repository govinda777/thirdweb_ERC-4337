# ERC-4337 Smart Wallet Project

This project demonstrates the implementation of ERC-4337 smart wallets using thirdweb's tools and components.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- A thirdweb account and API key

### Installation

```bash
# Install dependencies
npm install --repository=https://npm.pkg.github.com/ --prefer-offline --progress=false --verbose

# Install specific ethers version
npm uninstall ethers --repository=https://npm.pkg.github.com/
npm install ethers@5.7.2 --repository=https://npm.pkg.github.com/

# Install thirdweb packages
npm install @thirdweb-dev/react@latest @thirdweb-dev/chains@latest @thirdweb-dev/sdk@latest --repository=https://npm.pkg.github.com/
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
```

### Network Configuration

This project uses the Sepolia testnet. Make sure to:
1. Update all imports from Mumbai to Sepolia:
```typescript
import { Sepolia } from '@thirdweb-dev/chains';
```

2. Configure the ThirdwebProvider:
```typescript
<ThirdwebProvider activeChain={Sepolia} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
```

3. Deploy your Account Factory contracts to Sepolia through the thirdweb dashboard
4. Update API keys to include Sepolia network permissions

## 📚 Resources

- [Account Abstraction ERC4337 Tutorial](https://youtu.be/xmz7c7rl9cM)
- [thirdweb React Documentation](https://docs.thirdweb.com/react)
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript)
- [thirdweb Portal](https://docs.thirdweb.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [thirdweb Templates](https://thirdweb.com/templates)

## 🚀 Deployment

### Deploy to IPFS

```bash
yarn deploy
```

## 💬 Community

Join our Discord community for any questions or suggestions:
[https://discord.gg/thirdweb](https://discord.gg/thirdweb)

## 📝 Notes

> [!Important]  
> This repository was originally referencing the `mumbai` testnet.
> 
> The `Mumbai` network [has been deprecated since 04/08/2024](https://blog.thirdweb.com/deprecation-of-mumbai-testnet/), so the code in this repository has been adapted to work with Sepolia, which is the currently recommended testnet for Ethereum.

## 🤝 Contributing

Feel free to contribute to this project! Check out the [thirdweb GitHub organization](https://github.com/thirdweb-dev) for more information.

```
curl -X POST https://rpc-amoy.polygon.technology/ \
>   -H "Content-Type: application/json" \
>   --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
{"jsonrpc":"2.0","id":1,"result":"0x14041d5"}
```

## Faucet

https://www.alchemy.com/faucets/polygon-amoy

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
   <ThirdwebProvider activeChain={Mumbai} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
   
   // Depois
   <ThirdwebProvider activeChain={Sepolia} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
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
