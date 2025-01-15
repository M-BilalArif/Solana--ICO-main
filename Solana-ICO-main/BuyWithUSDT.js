import axios from "axios";
import solanaweb3, {
  Connection,
  PublicKey,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import bs58 from "bs58";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config({ path: "./keys.env" });

// --- Connection Setup ---
const connection = new Connection("https://api.devnet.solana.com");
// --- Sale Periods ---
const salePeriods = [
  {
    start: "2025-01-05",
    end: "2025-01-14",
    price: 0.00105,
    availableTokens: 70000000,
  },
  {
    start: "2025-01-15",
    end: "2025-01-24",
    price: 0.001125,
    availableTokens: 80000000,
  },
  {calculatePhaseBalance 
    start: "2025-01-25",
    end: "2025-02-04",
    price: 0.0012,
    availableTokens: 100000000,
  },
  {
    start: "2025-02-05",
    end: "2025-02-14",
    price: 0.001275,
    availableTokens: 100000000,
  },
  {
    start: "2025-02-15",
    end: "2025-02-24",
    price: 0.00135,
    availableTokens: 90000000,
  },
  {
    start: "2025-02-25",
    end: "2025-03-04",
    price: 0.001425,
    availableTokens: 60000000,
  },
];

// --- Global Addresses/Keys ---
const ICOHolderAddress = process.env.ICO_HOLDER_ADDRESS;
const ICOToken = process.env.ICO_TOKEN;
const ICOTokenPrivateKey = process.env.ICO_TOKEN_PRIVATE_KEY;

// --- Helper Functions ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCurrentSalePeriod = () => {
  const currentDate = moment().startOf("day");
  for (let i = 0; i < salePeriods.length; i++) {
    const saleStart = moment(salePeriods[i].start);
    const saleEnd = moment(salePeriods[i].end);
    if (currentDate.isBetween(saleStart, saleEnd, null, "[]")) {
      return {
        sale: i + 1,
        price: salePeriods[i].price,
        availableTokens: salePeriods[i].availableTokens,
      };
    }
  }
  return null;
};

const fetchSolanaPrice = async () => {
  try {
    const url = "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT";
    const response = await axios.get(url);

    return response.data.price;
  } catch (error) {
    throw new Error("Error fetching Solana price");
  }
};

const getTokenBalance = async () => {
  try {
    const senderPubKey = new PublicKey(ICOHolderAddress);
    const mintAddress = new PublicKey(ICOToken);
    const senderTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      senderPubKey
    );
    const senderTokenAccountInfo = await connection.getAccountInfo(
      senderTokenAccount
    );
    const decimals = 9;
    const senderTokenBalance = senderTokenAccountInfo
      ? senderTokenAccountInfo.data.readBigUInt64LE(64)
      : 0n;

    return Number(senderTokenBalance) / 10 ** decimals;
  } catch (error) {
    throw new Error("Error fetching token balance");
  }
};

// const getSolBalance = async (walletAddress) => {
//   try {
//     const walletPubKey = new PublicKey(walletAddress);
//     const balance = await connection.getBalance(walletPubKey);
//     return balance / 1e9; // from lamports to SOL
//   } catch (error) {
//     throw new Error("Error fetching SOL balance");
//   }
// };

// // Transfer SOL from one wallet to another
// const transferSol = async (ICOTOkenPrivateKey, recipientAddress, amount) => {
//     const senderWallet = solanaweb3.Keypair.fromSecretKey(bs58.decode(ICOTOkenPrivateKey));
//     const recipientPublicKey = new PublicKey(recipientAddress);

//     let transaction = new solanaweb3.Transaction().add(
//         solanaweb3.SystemProgram.transfer({
//             fromPubkey: senderWallet.publicKey,
//             toPubkey: recipientPublicKey,
//             lamports: amount * solanaweb3.LAMPORTS_PER_SOL,
//         })
//     );

//     transaction.feePayer = senderWallet.publicKey;

//     try {
//         let transactionHash = await connection.sendTransaction(transaction, [senderWallet]);
//         return transactionHash; // Return the transaction hash if successful
//     } catch (error) {
//         console.error("SOL transfer failed:", error);
//         throw new Error("SOL transfer failed");
//     }
// };

const transferToken = async (
  ICOTOkenPrivateKey,
  recipientAddress,
  amount,
  ICOToken
) => {
  try {
    const senderWallet = Keypair.fromSecretKey(bs58.decode(ICOTOkenPrivateKey));
    const recipientPublicKey = new PublicKey(recipientAddress);
    const tokenMintPublicKey = new PublicKey(ICOToken);
    const mintAccountInfo = await connection.getParsedAccountInfo(
      tokenMintPublicKey
    );
    const decimals = mintAccountInfo.value.data.parsed.info.decimals;
    const amountInSmallestUnit = Math.round(amount * 10 ** decimals);

    const senderTokenAccount = await getAssociatedTokenAddress(
      tokenMintPublicKey,
      senderWallet.publicKey
    );
    const recipientTokenAccount = await getAssociatedTokenAddress(
      tokenMintPublicKey,
      recipientPublicKey,
      true
    );

    const transaction = new Transaction();
    const recipientTokenAccountInfo = await connection.getAccountInfo(
      recipientTokenAccount
    );

    // Create a recipient token account if it doesn't exist
    if (!recipientTokenAccountInfo) { 
      transaction.add(
        createAssociatedTokenAccountInstruction(
          senderWallet.publicKey,
          recipientTokenAccount,
          recipientPublicKey,
          tokenMintPublicKey
        )
      );
    }

    transaction.add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        senderWallet.publicKey,
        amountInSmallestUnit
      )
    );

    transaction.feePayer = senderWallet.publicKey;
    return await connection.sendTransaction(transaction, [senderWallet]);
  } catch (error) {
    throw new Error("Token transfer failed");
  }
};

const confirmTransaction = async (transactionHash) => {
  try {
    const confirmation = await connection.confirmTransaction(transactionHash);
    if (confirmation.value.err) {
      throw new Error("Transaction failed");
    }
  } catch {
    throw new Error("Error confirming transaction");
  }
};

const tokenSalePrice = async () => {
  try {
    const currentSale = getCurrentSalePeriod();
    if (!currentSale) throw new Error("No active sale at the moment.");

    const tokenPrice = currentSale.price;
    console.log(`VLN Price ${tokenPrice}.`);
    return tokenPrice;
  } catch (error) {
    throw new Error("Error fetching token price");
  }
};

// --- Helper to calculate leftover tokens and check availability ---
const calculatePhaseBalance = (currentSale) => {
  // phaseminimumBalance is how many tokens remain after subtracting the phase’s available tokens
  // from a hypothetical total pool. Adjust the "basePool" numbers per phase as needed.
  switch (currentSale.sale) {
    case 1:
      return 500000000 - currentSale.availableTokens;
    case 2:
      return 430000000 - currentSale.availableTokens;
    case 3:
      return 350000000 - currentSale.availableTokens;
    case 4:
      return 250000000 - currentSale.availableTokens;
    case 5:
      return 150000000 - currentSale.availableTokens;
    case 6:
      return 60000000 - currentSale.availableTokens;
    default:
      throw new Error("Sale period not defined.");
  }
};

const RemainingTokenInSales = async () => {
  const currentSale = getCurrentSalePeriod();
  if (!currentSale) throw new Error("No active sale at the moment.");
  const tokenHolderBalance = await getTokenBalance();
  const phaseminimumBalance = calculatePhaseBalance(currentSale);
  const tokenInSale = tokenHolderBalance - phaseminimumBalance;
  console.log(`VLN Price   ${tokenInSale}.`);
  return tokenInSale;
};

const BuyWithUSDT = async (amountOfCurrency) => {
  try {
    const currentSale = getCurrentSalePeriod();
    if (!currentSale) throw new Error("No active sale at the moment.");
    const tokenHolderBalance = await getTokenBalance();
    const tokentoSell = amountOfCurrency / currentSale.price;

    const remainingBalance = tokenHolderBalance - tokentoSell;
    const phaseminimumBalance = calculatePhaseBalance(currentSale);

    const tokenInSale = remainingBalance - phaseminimumBalance;
    if (phaseminimumBalance > remainingBalance || tokenInSale < 0) {
      console.log("InSufficient Tokens");

      return "InSufficient Tokens";
      
    }

    console.log(`VLN token recived used ${tokentoSell}.`);
    return tokentoSell; // Return the amount in USDT
  } catch (error) {
    console.error(`Error : ${error.message}`);
  }
};

// --- Core Logic for Buying Tokens ---
const buyWithSol = async (amountOfCurrency) => {
  try {
    //  await sleep(6000);

    const solPrice = await fetchSolanaPrice();
    const amountInSOL = amountOfCurrency * solPrice;

    // Get the amount in USDT from BuyWithUSDT function
    const tokentoSell = await BuyWithUSDT(amountInSOL);

    return tokentoSell;

    // Here you can proceed with the transfer logic after calculating the amounts
  } catch (error) {
    console.error(`Error during SOL purchase transaction: ${error.message}`);
  }
};

const ExicuteTransaction = async (
  tokenBuyerAddress,
  amountOfTokenToTransfer
) => {
  const tokenTransferHash = await transferToken(
    ICOTokenPrivateKey,
    tokenBuyerAddress,
    amountOfTokenToTransfer,
    ICOToken
  );
  await confirmTransaction(tokenTransferHash);
  console.log(`Transaction Hash: ${tokenTransferHash} `);
  return tokenTransferHash;
};

const amountOfCurrency = 100;
// const tokenBuyerAddress = "4zAoNKa2pHnSwhYN5XEgK4K7RvhGaQvM3a8LwqtXShVE";
// const amountOfTokenToBuy = 10000;
// BuyWithUSDT(amountOfCurrency);
//  buyWithSol(amountOfCurrency);
// ExicuteTransaction(tokenBuyerAddress, amountOfTokenToBuy);

// tokenSalePrice();
// RemainingTokenInSales();






// APIs
export const RemainingTokenApi = async (req, res) => {
  try {
    const result = await RemainingTokenInSales();
    res
      .status(200)
      .json({ message: "Remaining Token  Displayed Successfully", result });
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred while Getting Remaining token",
    });
  }
};
export const VLNPriceFun = async (req, res) => {
  try {
    const result = await tokenSalePrice();
    res.status(200).json({ message: "Vln Displayed Successfully", result });
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "An error occurred while Getting Vln Displayed token",
    });
  }
};
export const TransferVLNapi = async (req, res) => {
  try {
    // console.log("indide of tey function");

    const { amountOfTokenToBuy, tokenBuyerAddress } = req.body;
    if (!amountOfTokenToBuy || isNaN(amountOfTokenToBuy)) {
      return res.status(400).json({ error: "Invalid or missing data" });
    }
    const result = await ExicuteTransaction(
      tokenBuyerAddress,
      amountOfTokenToBuy
    );
    res.status(200).json({ message: "Token Transfered Successfully", result });
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred while Transfering token",
    });
  }
};
export const ConvertWithSOLApi = async (req, res) => {
  try {
    const { amountOfCurrency } = req.body;
    if (!amountOfCurrency || isNaN(amountOfCurrency)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'amountOfCurrency' field" });
    }
    const result = await buyWithSol(amountOfCurrency);
    res.status(200).json({ message: "Conversion successful", result });
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "An error occurred while processing the Conversion",
    });
  }
};

export const ConvertWithUSDTApi = async (req, res) => {
  try {
    const { amountOfCurrency } = req.body;
    if (!amountOfCurrency || isNaN(amountOfCurrency)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'amountOfTokenToBuy' field" });
    }
    const result = await BuyWithUSDT(amountOfCurrency);
    res.status(200).json({ message: "Conversion successful", result });
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "An error occurred while processing the Conversion",
    });
  }
};






















