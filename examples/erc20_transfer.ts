import { ethers } from 'ethers';

// Replace with your own values
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

async function signERC20Transfer() {
  const to = '0xRecipientAddressHere';
  const amount = ethers.parseUnits('1.0', 18); // 1 token with 18 decimals
  const tokenAddress = '0xTokenAddressHere';

  const erc20Abi = [
    'function transfer(address to, uint amount) returns (bool)',
  ];

  const contract = new ethers.Contract(tokenAddress, erc20Abi, signer);
  const tx = await contract.populateTransaction.transfer(to, amount);

  console.log('Transaction payload:', tx);

  const signedTx = await signer.signTransaction(tx);
  console.log('Signed transaction:', signedTx);
}

signERC20Transfer().catch(console.error);
