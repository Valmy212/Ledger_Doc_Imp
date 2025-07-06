import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import { ethers } from "ethers";

async function signWithLedger() {
  // Connect to Ledger via WebUSB
  const transport = await TransportWebUSB.create();
  const eth = new Eth(transport);

  // Replace with your own values
  const tokenAddress = "0xTokenAddressHere";
  const to = "0xRecipientAddressHere";
  const amount = ethers.parseUnits("1.0", 18); // Sending 1 token
  const fromAddress = "0xYourLedgerEthAddress"; // Needed to get nonce, gas info, etc.

  const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
  const nonce = await provider.getTransactionCount(fromAddress);
  const gasPrice = await provider.getGasPrice();
  const chainId = (await provider.getNetwork()).chainId;

  const erc20Interface = new ethers.Interface([
    "function transfer(address to, uint amount) returns (bool)"
  ]);
  const data = erc20Interface.encodeFunctionData("transfer", [to, amount]);

  const txParams = {
    nonce: ethers.toBeHex(nonce),
    gasLimit: ethers.toBeHex(60000),
    gasPrice: ethers.toBeHex(gasPrice),
    to: tokenAddress,
    value: "0x00",
    data: data,
    chainId: chainId,
    type: 0x02 // Optional: for EIP-1559 you can use type 0x02
  };

  // Convert to Ledger format
  const rawTxHex = ethers.serializeTransaction(txParams).slice(2); // remove 0x

  // Use Ledger to sign the transaction (replace with actual derivation path)
  const result = await eth.signTransaction("44'/60'/0'/0/0", rawTxHex);
  console.log("Signature from Ledger:", result);

  transport.close();
}

signWithLedger().catch(console.error);
