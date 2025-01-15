
//code fine it gets the sol balance from wallet 
import solanaweb3, { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

// Create a connection to the Solana devnet
const connection = new solanaweb3.Connection("https://api.devnet.solana.com");

// Replace these with the actual public keys you want to check
const senderPublicKey = new PublicKey("Agb7ne7s4hMoRjQX82ME7q5XhjMW5bfkCn5HShkTsnk3");
 // Replace these with the actual public keys you want to check
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



// Api
export const VLNSOlBalanceApi = async (req, res) => {
    try {
      const result = await VLNSolBalance();
       
      res.status(200).json({ message: "Usdt Raised Fetched successful", result });
    } catch (error) {
      res.status(500).json({
        error:
          error.message || "An error occurred while processing the Conversion",
      });
    }
  };