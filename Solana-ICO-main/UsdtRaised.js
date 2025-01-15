

// this code works fine it give the balance of custom token from wallet 

import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from 'dotenv';
dotenv.config({ path: './keys.env' }); 

// Initialize the connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const FundsWalletAddress = process.env.FUNDS_RECEIVER_ADDRESS;
// Replace with actual sender's and receiver's public keys
const USDTAddress = process.env.USDT_ADDRESS;
 
// Replace with your custom token's mint address (SPL token's mint address)
 const RaisedUsdt=async () => {
    try {
        // Convert public keys from base58 string
        const senderPubKey = new PublicKey(FundsWalletAddress);
         const mintAddress = new PublicKey(USDTAddress);

        // Get the associated token accounts for sender and receiver for the custom token
        const senderTokenAccount = await getAssociatedTokenAddress(mintAddress, senderPubKey);
 
        // Get the account info for the sender's and receiver's token accounts using connection.getAccountInfo
        const senderTokenAccountInfo = await connection.getAccountInfo(senderTokenAccount);
 
        // If the token account exists, get the balance. If not, the balance is 0.
        const senderTokenBalance = senderTokenAccountInfo
            ? senderTokenAccountInfo.data.readBigUInt64LE(64)
            : 0n;  // Return 0 BigInt if no token balance is found
        
        // Convert balances from the smallest unit (token's decimal places) to human-readable format
        const decimals = 6;  // Updated to 9 decimals for your token
        const senderTokenBalanceInTokens = Number(senderTokenBalance) / (10 ** decimals);
 
        // Print the balance in custom token
        console.log(`Sender's custom token balance: ${senderTokenBalanceInTokens.toFixed(4)} Tokens`);
         return senderTokenBalanceInTokens.toFixed(4) 
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
};


// Api
export const UsdtRaisedApi = async (req, res) => {
    try {
      const result = await RaisedUsdt();
       
      res.status(200).json({ message: "Usdt Raised Fetched successful", result });
    } catch (error) {
      res.status(500).json({
        error:
          error.message || "An error occurred while processing the Conversion",
      });
    }
  };