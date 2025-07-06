# Ledger Clear Signing Examples

This repository provides practical examples of how to use Ledger's Clear Signing features, including support for ERC-7730.

## Contents

- `examples/erc20_transfer.ts`: Sign an ERC-20 token transfer.
- `examples/permit_signing.ts`: Sign an EIP-2612 style permit.
- `examples/swap_payload_erc7730.ts`: Build and sign a swap payload using ERC-7730.
- `test/clear_signing.test.ts`: Sample unit tests using Mocha.

## Requirements

- Node.js >= 16
- TypeScript
- ethers.js or web3.js
- Hardhat (for local testing)

## Getting Started

```bash
npm install
npx hardhat test
```

## Resources

- [Ledger Developer Portal](https://developers.ledger.com)
- [ERC-7730 Specification](https://eips.ethereum.org/EIPS/eip-7730)
