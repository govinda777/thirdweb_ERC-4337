import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Signer } from "ethers";
import Navbar from "./navbar";
import UserProfile from "./profile";

export const Connected = ({
    signer,
}: {
    signer: Signer;
}) => {
    return (
        <ThirdwebSDKProvider
            signer={signer}
            activeChain={"<NEXT_PUBLIC_THIRDWEB_CLIENT_ID>"}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        >
            <ConnectedComponents />
        </ThirdwebSDKProvider>
    )
};

const ConnectedComponents = () => {
    return (
        <div>
            <Navbar />
            <UserProfile />
        </div>
    )
};