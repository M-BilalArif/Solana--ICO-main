import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Time from "./Time";
import logo1 from "../assets/img/banner-logo1.png";
import logo2 from "../assets/img/banner-logo2.png";
import logo3 from "../assets/img/logo.png";
// import VLNSolBalance from '../../VLNSolBalance';  // Adjust path if needed
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
// const connection = new solanaweb3.Connection("https://api.devnet.solana.com");
export default function BannerCard({ className, timeLeft }) {
  const [activeTab, setActiveTab] = useState("usdt");
  const [inputValue, setInputValue] = useState("");
  const [Remaining, SetRemaining] = useState("");
  const [CurrentVLN, setCurrentVLN] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [UsdtRaised, setUsdtRaised] = useState("");
  const [respAmount, setRespAmount] = useState("0");
  // const [Disabled,SetDisabled]=useState(false)
  const [Wallet, setWallet] = useState("");
  const wallet = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [loader, setLoader] = useState(false);
  const network = WalletAdapterNetwork.Devnet;
  // RPC endpoint for the selected network
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const crypto = [
    {
      name: "usdt",
      icon: logo1,
      value: 0,
    },
    {
      name: "sol",
      icon: logo2,
      value: 0,
    },
  ];
  const RemainingFunction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Remaining-token-api"
      );
      console.log("response vllnnnnnnnnnnnnnn:", response.data.result);
      SetRemaining(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const CurrentVlnGetting = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Vln-Amount-Getting"
      );
      console.log("response vllnnnnnnnnnnnnnn:", response.data.result);
      setCurrentVLN(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const UsdtRaisedFunction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Usdt-amount-raised"
      );
      console.log("response vllnnnnnnnnnnnnnn:", response.data.result);
      setUsdtRaised(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CurrentVlnGetting();
    UsdtRaisedFunction();
    RemainingFunction()
  }, []);
  const VlnSendingFunction = async (amountOfTokenToBuy) => {
    try {
      const response = axios.post(
        "http://localhost:5000/VLN-Token-Transfer-Api",
        {
          tokenBuyerAddress: Wallet,
          amountOfTokenToBuy: amountOfTokenToBuy,
        }
      );
      console.log("response :", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendToken = async () => {
    console.log("i am in usdt transfer function");
    try {
      const ICOToken = "4evpaeTCYqaYqgeonDcfY8BzXRWjxUndEpKCFFNYarSP"; // Replace with your custom token
      let recipient = "Exgg7y6KYDMsEWgJEpp9rRenVwZ9VRTPTdXUxFCtAGkW"; //owner address
      let amount = inputValue; //amount
      if (!recipient && !amount) {
        alert("Please enter both recipient address and amount.");
        return;
      }

      const connection = new Connection(endpoint, "confirmed");
      const senderPublicKey = window.solana.publicKey;
      const recipientPublicKey = new PublicKey(recipient);
      const tokenMintPublicKey = new PublicKey(ICOToken);

      // Get associated token account for the sender
      const senderTokenAccount = await getAssociatedTokenAddress(
        tokenMintPublicKey,
        senderPublicKey
      );

      // Get associated token account for the recipient
      const recipientTokenAccount = await getAssociatedTokenAddress(
        tokenMintPublicKey,
        recipientPublicKey,
        true
      );

      const transaction = new Transaction();

      // Check if the recipient's token account exists, if not, create it
      const recipientTokenAccountInfo = await connection.getAccountInfo(
        recipientTokenAccount
      );
      if (!recipientTokenAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            senderPublicKey,
            recipientTokenAccount,
            recipientPublicKey,
            tokenMintPublicKey
          )
        );
      }

      // Convert amount to the smallest unit (based on token decimals)
      const mintAccountInfo = await connection.getParsedAccountInfo(
        tokenMintPublicKey
      );
      const decimals = mintAccountInfo.value.data.parsed.info.decimals;
      const amountInSmallestUnit = Math.round(amount * 10 ** decimals);

      // Add the transfer instruction
      console.log(senderTokenAccount.toString());
      console.log(recipientTokenAccount.toString());
      console.log(senderPublicKey.toString());
      console.log(amountInSmallestUnit);

      transaction.add(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          senderPublicKey,
          amountInSmallestUnit
        )
      );
      console.log(1);

      // Fetch the latest blockhash
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = senderPublicKey;

      // Request the wallet to sign the transaction
      const signedTransaction = await window.solana.signTransaction(
        transaction
      );

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm the transaction
      await connection.confirmTransaction(signature, "confirmed");

      alert("Transaction successful!");
      VlnSendingFunction(respAmount);
      //CAll api here of execute transaction
    } catch (error) {
      console.error(error);
      alert("Token transfer failed");
    }
  };

  const handleSendSOL = async () => {
    console.log("I am in Sol transfer function");

    try {
      let recipient = "Exgg7y6KYDMsEWgJEpp9rRenVwZ9VRTPTdXUxFCtAGkW";
      let amount = inputValue;
      if (!recipient || !amount) {
        alert("Please enter both recipient address and amount.");
        return;
      }

      const amountInLamports = parseFloat(amount) * 1_000_000_000; // Convert SOL to lamports
      if (isNaN(amountInLamports) || amountInLamports <= 0) {
        alert("Invalid amount.");
        return;
      }

      const connection = new Connection(endpoint, "confirmed");
      const senderPublicKey = window.solana.publicKey;

      if (!senderPublicKey) {
        alert("Connect your wallet first.");
        return;
      }

      const recipientPublicKey = new PublicKey(recipient).toString();
      console.log("recipientPublicKey", recipientPublicKey);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: amountInLamports,
        })
      );

      // Fetch the latest blockhash
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = senderPublicKey;

      // Request the wallet to sign the transaction
      const signedTransaction = await window.solana.signTransaction(
        transaction
      );

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm the transaction
      await connection.confirmTransaction(signature, "confirmed");
      VlnSendingFunction(respAmount);
      alert("Transaction successful!");
    } catch (error) {
      console.error("Error sending SOL:", error);
      alert("Transaction failed. Check the console for details.");
    }
  };
   const TokenTransferFunctionn =  () => {
    if (activeTab === "usdt") {
// check add karna haa owner kaa account main 
      handleSendToken();
    } else {
// check add karna haa owner kaa account main 
      handleSendSOL();
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      setIsConnected(true);
      console.log("Wallet is connected:", wallet.publicKey?.toString());
      setWallet(wallet.publicKey?.toString());
    } else {
      setIsConnected(false);
      console.log("Wallet is not connected");
    }
  }, [wallet.connected]);

  // const VLNHolderSolBalance =async()=> {
  //       const VLNTokenHolder = "5nxUnRTw9TxNJVL7CqVyVCEZFJQR5Pg2iDccfNg5yALA"; 
        
  //       const walletPubKey = new PublicKey(VLNTokenHolder);
  //       const balance = await connection.getBalance(walletPubKey);
  //       console.log("dfghj345678987654567654565454",balance/ 1e9);
  //       return balance/ 1e9;

  // };

  const PriceFetchingFunction = async (val) => {
    try {
      if (!val.trim()) return; // Skip API call for empty input
      if (activeTab === "usdt") {
        setLoader(true);
        const response = await axios.post(
          `http://localhost:5000/Usdt-Conversion-Api`,
          {
            amountOfCurrency: val,
          }
        );
        // const SolBalance=VLNSolBalance();
        // ||SolBalance<0.0002
        if (response.data.result==="InSufficient Tokens"  ) {
          console.log("in side of check");
          
          setIsDisabled(true)
          }
          else{
            setIsDisabled(false)
          }
          setRespAmount(response.data.result);
        // SetDisabled(!Disabled)
        console.log("Response from backend:", response.data.result);
        setLoader(false);
      } else {
        setLoader(true);

        const response = await axios.post(
          `http://localhost:5000/Sol-Conversion-Api`,
          {
            amountOfCurrency: val,
          }
        );
           // ||SolBalance<0.0002
          // const SolBalance=VLNSolBalance();
           if (response.data.result==="InSufficient Tokens" ) {
            console.log("in side of check");
            setIsDisabled(true)
            }
            else{
              setIsDisabled(false)
            }
          setRespAmount(response.data.result);
        // }
        // SetDisabled(!Disabled)
        console.log("Response from backend:", response.data);
        setLoader(false);
      }
    } catch (error) {
      console.log("Error from backend:", error);
    }
  };
   
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    PriceFetchingFunction(inputValue);
  }, [inputValue, activeTab]);

  console.log("Amount in value:", isDisabled);

  return (
    <div
      className={`max-w-[476px] banner-card border border-black bg-[#F6F6F6] rounded-3xl overflow-hidden ${className}`}
    >
      <div className="bg-[#A6DFF5] py-[14px] text-center">
        <p className="text-base text-black !leading-[1.4] font-Gliker font-normal">
          Stage 1.
        </p>
        <p className="text-base md:text-lg lg:text-xl text-black !leading-[1.4] font-Gliker font-normal">
          $VLN PRESALE IS NOW LIVE!
        </p>
      </div>
      <div className="py-4 bg-[#FFEF77] border-b border-black mb-5 lg:mb-6 rounded-br-3xl rounded-bl-3xl px-5 lg:px-6 xl:px-8">
        <p className="text-center text-[#0A0228] text-lg font-bold font-Gliker mb-2 md:mb-4">
          Until next price
        </p>
        <Time timeLeft={timeLeft} />
        <div className="">
          <div className="line w-full h-6 md:h-[32px] border border-black rounded-lg overflow-hidden bg-white relative z-[1]">
            <div className="absolute w-1/2 h-full top-0 left-0 bg-[#97DBF5]"></div>
          </div>
          <div className="flex justify-between mb-3 mt-5 xl:mt-6">
            <p className="text-base text-black !leading-[1.4] font-Gliker font-normal">
              USDT RAISED:
              <br />
              Token in sale:
            </p>
            <p className="text-base text-black !leading-[1.4] font-Gliker font-normal">
              {UsdtRaised?(UsdtRaised):(0)}
              <br />
              {Remaining?(Remaining):(0)}
            </p>
          </div>
          <p className="text-sm text-center text-black !leading-[1.4] font-Gliker font-normal mb-[6px]">
            VLN= {CurrentVLN}
          </p>
          <p className="text-sm text-center text-black !leading-[1.4] font-Gliker font-normal mb-[6px]">
            Listing Price: 0.00105
          </p>
        </div>
      </div>
      <div className="mb-5 lg:mb-6 xl:mb-8 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black !leading-[1.4] font-Gliker font-normal mb-[6px]">
            YOUR PURCHASED $VLN
          </p>
          <p className="text-sm text-black !leading-[1.4] font-Gliker font-normal mb-[6px]">
            0
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
          {crypto.map((item, index) => (
            <button
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center Shadow gap-3 justify-center border text-black border-black rounded-2xl ${
                item.name === activeTab ? "bg-black bg-opacity-5" : ""
              }`}
              key={index}
            >
              <img src={item.icon} className="size-5 rounded-full" alt="" />
              <p className="text-xs font-bold uppercase">{item.name}</p>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {activeTab === "usdt" && (
            <>
              <div className="single relative z-[1]">
                <input
                  type="text"
                  className="w-full border border-black Shadow rounded-2xl text-black placeholder:text-xs placeholder:text-black pl-4"
                  onChange={handleChange}
                  value={inputValue}
                  placeholder="YOU PAY"
                />
                <img
                  src={logo1}
                  className="size-5 absolute top-1/2 -translate-y-1/2 right-[14px] rounded-full"
                  alt=""
                />
              </div>
              <div className="single relative z-[1]">
                <input
                  type="text"
                  className="w-full Shadow border border-black rounded-2xl text-black placeholder:text-xs placeholder:text-black pl-4"
                  readOnly
                  value={respAmount}
                  placeholder="0"
                />
                <img
                  src={logo3}
                  className="size-5 absolute top-1/2 -translate-y-1/2 right-[14px] rounded-full"
                  alt=""
                />
              </div>
            </>
          )}
          {activeTab === "sol" && (
            <>
              <div className="single relative z-[1]">
                <input
                  type="text"
                  className="w-full border border-black Shadow rounded-2xl text-black placeholder:text-xs placeholder:text-black pl-4"
                  onChange={handleChange}
                  value={inputValue}
                  placeholder="YOU PAY"
                />
                <img
                  src={logo2}
                  className="size-5 absolute top-1/2 -translate-y-1/2 right-[14px] rounded-full"
                  alt=""
                />
              </div>
              <div className="single relative z-[1]">
                {/* <input
                  type="text"
                  className="w-full Shadow border border-black rounded-2xl text-black placeholder:text-xs placeholder:text-black pl-4"
                  readOnly
                  placeholder="0"
                /> */}
                <input
                  type="text"
                  className="w-full Shadow border border-black rounded-2xl text-black placeholder:text-xs placeholder:text-black pl-4"
                  readOnly
                  value={respAmount}
                  placeholder="0"
                />
                <img
                  src={logo3}
                  className="size-5 absolute top-1/2 -translate-y-1/2 right-[14px] rounded-full"
                  alt=""
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-5 lg:mt-6 xl:mt-8">
          {isConnected ? (
            <button
            disabled={isDisabled} 
              onClick={TokenTransferFunctionn}
              className="hover:text-white hover:bg-primary w-full text-center justify-center px-4 py-3 md:py-[15px] bg-[#FFEF77] border border-black rounded-2xl flex items-center gap-2 text-base md:text-lg lg:text-xl text-[#161618] !leading-[1.4] font-Gliker font-normal"
            >
              {loader ? (
                <>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </>
              ) : (
                <> Purchase VLN</>
              )}
            </button>
          ) : (
            <> 
              <button  className="hover:text-white hover:bg-[#FFEF77]  w-full text-center justify-center px-4 py-3 md:py-[15px] bg-primary border border-black rounded-2xl flex items-center gap-2 text-base md:text-lg lg:text-xl text-[#161618] !leading-[1.4] font-Gliker font-normal">
                Connect your Wallet
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
