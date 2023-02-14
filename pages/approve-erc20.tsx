import { FC, useEffect, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import ERC20Json from "../utils/contracts/ERC20.json";
import { ERC20 } from "../utils/contractTypes/ERC20";
import { AbiItem } from "web3-utils";
import { EAlertStatus, useNotify } from "../hooks/useNotify";
import { TransactionReceipt } from "web3-core";
import { useLoading } from "../hooks/useLoading";
import { Button, Input, Statistic } from "antd";
import { CheckCircleFilled, CodeFilled, DollarCircleFilled } from "@ant-design/icons";
import style from "../styles/Erc20approve.module.sass";

const ApproveERC20: FC = () => {
  const { web3Data } = useWeb3();
  const { setNotify } = useNotify();
  const { setLoading, loading } = useLoading();
  const [approveAmount, setApproveAmount] = useState<number>(0);
  const [erc20, setErc20] = useState<ERC20 | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [spender, setSpender] = useState<string>("");
  const [allowance, setAllowance] = useState<number>(0);

  useEffect(() => {
    if (erc20) {
      erc20.methods
        .symbol()
        .call()
        .then((symbol) => setTokenSymbol(symbol));
    }
  }, [erc20]);

  const handleErc20AddrChange = async (erc20Addr: string) => {
    if (web3Data.web3.utils.isAddress(erc20Addr)) {
      const erc20 = new web3Data.web3.eth.Contract(ERC20Json.abi as AbiItem[], erc20Addr) as unknown as ERC20;
      return setErc20(erc20);
    }
    setNotify({ title: "Token Not Exist", status: EAlertStatus.warning });
  };
  const handleSpenderChange = async (spender: string) => {
    try {
      const code = await web3Data.web3.eth.getCode(spender);
      if (code !== "0x") {
        const allowance = await erc20?.methods.allowance(web3Data.accounts[0], spender).call();
        const decimals = (await erc20?.methods.decimals().call()) as unknown as number;
        console.log({ allowance, acc: web3Data.web3.eth });
        setAllowance((allowance as unknown as number) / 10 ** decimals);
        setSpender(spender);
        return;
      }
      setNotify({ status: EAlertStatus.warning, title: "Spender is not a smart contract" });
    } catch (e) {
      setNotify({ status: EAlertStatus.error, title: "Not a valid address" });
    }
  };

  const approveERC20 = async (spender: string) => {
    setLoading({ isShown: true });
    const decimals = (await erc20?.methods.decimals().call()) as unknown as number;

    if (!decimals || !erc20) return;
    let result: TransactionReceipt | null = null;
    try {
      const amount = approveAmount * 10 ** decimals;
      result = await erc20.methods.approve(spender, amount).send({ from: web3Data.accounts[0] });
      const allowance = await erc20?.methods.allowance(web3Data.accounts[0], spender).call();
      setAllowance((allowance as unknown as number) / 10 ** decimals);
      setNotify({
        status: result.status ? EAlertStatus.success : EAlertStatus.error,
        title: result.status ? "Transaction succeeded" : "Transaction failed",
        description: `Transaction hash: ${result.transactionHash}`,
      });
    } catch (e) {
      setNotify({
        status: EAlertStatus.error,
        title: "Transaction failed",
        description: `Detail: ${JSON.stringify((e as Error).message)}`,
      });
    }
    setLoading({ isShown: false });
  };

  return (
    <div className={style.erc20approve}>
      <Input.Search
        addonBefore="Token(ERC20) address"
        onSearch={(value) => handleErc20AddrChange(value)}
        loading={loading.isShown}
      />
      <Input.Search
        addonBefore="Spender(Smart Contract) address"
        onSearch={(value) => handleSpenderChange(value)}
        loading={loading.isShown}
      />
      <Statistic
        title="Token(ERC20)"
        value={tokenSymbol}
        valueStyle={{ color: "rgb(245, 106, 0)" }}
        prefix={<DollarCircleFilled />}
      />
      <Statistic
        title="Spender(Smart Contract)"
        value={spender}
        valueStyle={{ color: "rgb(245, 106, 0)" }}
        prefix={<CodeFilled />}
      />
      <Statistic
        title="Allowance"
        value={allowance}
        valueStyle={{ color: "rgb(245, 106, 0)" }}
        prefix={<CheckCircleFilled />}
      />
      <Input
        type="number"
        addonBefore="Amount to approve"
        suffix={tokenSymbol}
        disabled={!erc20 || !spender || loading.isShown ? true : false}
        onChange={(evt) => setApproveAmount(Number(evt.target.value))}
      />
      <Button onClick={() => approveERC20(spender)} disabled={loading.isShown}>
        APPROVE
      </Button>
    </div>
  );
};
export default ApproveERC20;
