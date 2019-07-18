import { NativeModules, NativeEventEmitter } from "react-native";
import {ethers, Contract as EthersContract} from 'ethers';
let infuraProvider = new ethers.providers.InfuraProvider('mainnet');


// const getAddress = (cb) => NativeModules.WalletModule.getAddress(cb);
const getAddress = async () => {
  try {
    return await NativeModules.WalletModule.getAddress();
  } catch(e) {
    return "Wallet fetch failed"
  }
};

const getBalance = async () => {
  try {
    return await NativeModules.WalletModule.getBalance();
  } catch(e) {
    return "Get balance failed with error: " + e
  }
};


const sendTransaction = async ({to, value, data}) => {
  try {
    return await NativeModules.WalletModule.sendTransaction(to, value, data);
  } catch(e) {
    return "Send transaction failed with error: " + e
  }
};

const sendTransactionWithDapplet = async ({to, value, data}) => {
  try {
    return await NativeModules.WalletModule.sendTransactionWithDapplet(to, value, data);
  } catch(e) {
    return "Send transaction failed with error: " + e
  }
};

const signTransaction = async ({to, value, data}) => {
  try {
    return await NativeModules.WalletModule.signTransaction(to, value, data);
  } catch(e) {
    return "Sign transaction failed with error: " + e
  }
};

const signMessage = async (message) => {
  try {
    return await NativeModules.WalletModule.signMessage(ethers.utils.formatBytes32String(message));
  } catch(e) {
    return "Sign message failed with error: " + e
  }
};

const settingsPopUp = () => NativeModules.NativeVCModule.setting();

const openBrowser = (url) =>  url ? NativeModules.NativeVCModule.browser(url) : NativeModules.NativeVCModule.browser('duckduckgo.com');

const sendToken = () => {
  return "Coming Soon!"
};

const write = async ({contractAddress, abi, functionName, parameters, value, data}) => {
  try {
    return await NativeModules.ContractModule.write(contractAddress, JSON.stringify(abi), functionName, parameters, value, data);
  } catch(e) {
    return "Write to contract failed with error: " + e
  }
};

const read = async ({contractAddress, abi, functionName, parameters}) => {
  const contract = new EthersContract(contractAddress, abi, infuraProvider);
  if (parameters.length === 0) {
    return contract[functionName]();
  } else if (parameters.length > 0) {
    return contract[functionName](...parameters);
  }
};

const resolve = async (ensName) => {
  if (ensName.slice(-4) === '.eth') {
    try {
      return await infuraProvider.resolveName(ensName);
    } catch (e) {
      return "ENS resolver error: " + e;
    }
  }
};

const walletChangeEvent = () => {
  return new NativeEventEmitter(NativeModules.CallRNModule);
};

export const Settings = {
  settingsPopUp,
  openBrowser
};

export const Wallet = {
  getAddress,
  getBalance,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken,
  walletChangeEvent,
  sendTransactionWithDapplet
};

export const Contract = {
  write,
  read
};

export const ENS = {
  resolve
}
