import { ThirdwebSDK, isContractDeployed, Transaction, TransactionResultWithId } from "@thirdweb-dev/sdk";
import { SmartWallet, LocalWallet } from "@thirdweb-dev/wallets";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { MONSTER_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, ACCOUNT_FACTORY_ADDRESS } from "../const/addresses";

// Validação de ambiente
if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
    throw new Error("Missing THIRDWEB_CLIENT_ID environment variable");
}

if (!ACCOUNT_FACTORY_ADDRESS) {
    throw new Error("Invalid factory address configuration");
}

export function createSmartWallet(): SmartWallet {
    console.log("[DEBUG] Creating SmartWallet with config:", {
        chain: PolygonZkevmTestnet.name,
        chainId: PolygonZkevmTestnet.chainId,
        factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        gasless: true,
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
        rpcUrls: PolygonZkevmTestnet.rpc,
    });
    
    return new SmartWallet({
        chain: PolygonZkevmTestnet,
        factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        gasless: true,
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
}

export async function connectSmartWallet(
    password: string,
    statusCallback: (status: string) => void
): Promise<SmartWallet> {
    try {
        statusCallback("Searching for trainer account...");
        const smartWallet = createSmartWallet();
        const personalWallet = new LocalWallet();

        if (!password) {
            throw new Error("A senha não pode ser vazia.");
        }

        // 1. Initialize personal wallet
        console.log("[DEBUG] Loading or creating personal wallet...");
        await personalWallet.loadOrCreate({
            strategy: "encryptedJson",
            password: password,
        });

        const address = await personalWallet.getAddress();
        if (!address) {
            throw new Error("Falha ao criar ou carregar carteira local.");
        }
        console.log("[DEBUG] personalWallet address:", address);

        // 2. Connect with explicit chain ID
        console.log("[DEBUG] Connecting smart wallet with chainId:", PolygonZkevmTestnet.chainId);
        await smartWallet.connect({
            personalWallet,
            chainId: PolygonZkevmTestnet.chainId
        });
        console.log("[DEBUG] Smart wallet connected successfully");

        // 3. Validate connection
        const walletAddress = await smartWallet.getAddress();
        if (!walletAddress) {
            throw new Error("Connection failed");
        }
        console.log("[DEBUG] Smart wallet address:", walletAddress);

        const sdk = await ThirdwebSDK.fromWallet(
            smartWallet,
            PolygonZkevmTestnet,
            {
                clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
            }
        );

        // 4. Check factory deployment
        console.log("[DEBUG] Checking factory deployment at:", ACCOUNT_FACTORY_ADDRESS);
        const isFactoryDeployed = await isContractDeployed(
            ACCOUNT_FACTORY_ADDRESS,
            sdk.getProvider()
        );

        if (!isFactoryDeployed) {
            throw new Error("Factory contract not deployed on this network");
        }

        const isDeployed = await isContractDeployed(
            walletAddress,
            sdk.getProvider()
        );

        if (!isDeployed) {
            statusCallback("New account detected...");
            const monsterContract = await sdk.getContract(MONSTER_CONTRACT_ADDRESS);
            const tokenContract = await sdk.getContract(TOKEN_CONTRACT_ADDRESS);

            statusCallback("Creating new account...");
            const tx1 = await monsterContract.erc1155.claim.prepare(0, 1);
            const tx2 = await tokenContract.erc20.claim.prepare(10);
            const transactions = [tx1, tx2] as any[];

            statusCallback("Sending starter monster and initial funds...");
            const batchTx = await smartWallet.executeBatch(transactions);
        } else {
            statusCallback("Trainer account found! Loading monsters...");
        }

        return smartWallet;
    } catch (error: any) {
        console.error("[DEBUG] Error details:", {
            error,
            chainId: PolygonZkevmTestnet.chainId,
            chainName: PolygonZkevmTestnet.name,
            factoryAddress: ACCOUNT_FACTORY_ADDRESS,
            clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID?.slice(0,5),
            rpcUrls: PolygonZkevmTestnet.rpc,
            errorMessage: error.message,
            errorStack: error.stack
        });
        throw error;
    }
}
