import { ThirdwebSDK, isContractDeployed } from "@thirdweb-dev/sdk";
import { SmartWallet, LocalWallet } from "@thirdweb-dev/wallets";
import { MONSTER_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, ACCOUNT_FACTORY_ADDRESS } from "../const/addresses";

export function createSmartWallet(): SmartWallet {
    const smartWallet = new SmartWallet({
        chain: `${process.env.CHAIN_NAME}`,
        factoryAddress: `${process.env.CONTRACTS_ACCOUNT_FACTORY}`,
        gasless: true,
        clientId: process.env.THIRDWEB_CLIENT_ID,
    });
    return smartWallet;
};

export async function connectSmartWallet(
    password: string,
    statusCallback: (status: string) => void
): Promise<SmartWallet> {
    statusCallback("Searching for trainer account...");
    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();
    await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: password,
    });
    await smartWallet.connect({
        personalWallet
    });

    const sdk = await ThirdwebSDK.fromWallet(
        smartWallet,
        `${process.env.CHAIN_ID}`,
        {
            clientId: process.env.THIRDWEB_CLIENT_ID,
        }
    );

    const address = await sdk.wallet.getAddress();
    const isDeployed = await isContractDeployed(
        address,
        sdk.getProvider(),
    );

    if (!isDeployed) {
        statusCallback("New account detected...");
        const monsterContract = await sdk.getContract(process.env.MONSTER_CONTRACT_ADDRESS || "");
        const tokenContract = await sdk.getContract(process.env.TOKEN_CONTRACT_ADDRESS || "");

        statusCallback("Creating new account...");
        const tx1 = await monsterContract.erc1155.claim.prepare(0, 1);
        const tx2 = await tokenContract.erc20.claim.prepare(10);
        const transactions = [tx1, tx2];

        statusCallback("Sending starter monster and initial funds...");
        const batchTx = await smartWallet.executeBatch(transactions);
    } else {
        statusCallback("Trainer account found! Loading monsters...");
    }
    return smartWallet;
};