
//code fine it gets the sol balance from wallet 
import solanaweb3, { PublicKey } from "@solana/web3.js";
// import solanaweb3, { PublicKey } from "/node_modules/.vite/deps/@solana_web3__js.js?v=4da00ece";
// import __vite__cjsImport1_bs58 from "/node_modules/.vite/deps/bs58.js?v=4da00ece"; const bs58 = __vite__cjsImport1_bs58.__esModule ? __vite__cjsImport1_bs58.default : __vite__cjsImport1_bs58;

// import bs58 from "bs58";

// Create a connection to the Solana devnet
const connection = new solanaweb3.Connection("https://api.devnet.solana.com");

// Replace these with the actual public keys you want to check
const senderPublicKey = new PublicKey("Agb7ne7s4hMoRjQX82ME7q5XhjMW5bfkCn5HShkTsnk3");
const VLNSolBalance=async () => {
    try {
        // Get the balance of the sender and receiver using their public keys
        let senderBalance = await connection.getBalance(senderPublicKey);
        let SOlBalance=senderBalance / solanaweb3.LAMPORTS_PER_SOL
        // Convert the balance from lamports to SOL and log it
        console.log(`Sender's balance: ${SOlBalance} SOL`);
        return SOlBalance;
     } catch (error) {
        console.error("Error fetching balance:", error);
    }
};
// VLNSolBalance();
export default VLNSolBalance;  // or export { VLNSolBalance } if not default
