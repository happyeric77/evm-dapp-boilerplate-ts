import style from "../../styles/Header.module.sass";
import router from "next/router";
import { Button, Avatar, Tooltip, Dropdown, Space } from "antd";
import { WalletOutlined, DisconnectOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { supportedChains } from "../../utils/constant";
import { FC } from "react";
import Link from "next/link";
import { useWeb3 } from "evm-web3-hooks";

const Header: FC = () => {
  const { web3Data, loginWithInjectedWeb3, loginWithWalletConnect, logout, switchNetwork } = useWeb3();

  return (
    <>
      <div className={style.header}>
        <div
          className={style.imgs}
          onClick={() => {
            router.push("/");
          }}
        >
          Colorful DAPP
        </div>
        <Space size="large">
          <Link href="/approve-erc20">Approve Token</Link>
          <Dropdown
            menu={{
              items: Object.keys(supportedChains).map((chain, key) => ({
                label: supportedChains[chain].chainName,
                key,
                onClick: () => switchNetwork(Number(chain)),
              })),
              theme: "dark",
            }}
            trigger={["click"]}
          >
            <div className="ant-dropdown-link" style={{ marginRight: "10px" }}>
              Select Network <DownOutlined />
            </div>
          </Dropdown>
        </Space>

        {web3Data?.accounts?.[0] && (
          <Avatar.Group className={style.userInfo}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#f56a00" }}></Avatar>
            <Tooltip
              title={web3Data?.accounts?.[0].slice(0, 6) + "...." + web3Data?.accounts?.[0].slice(-4)}
              placement="top"
            >
              <div className="chain">
                {web3Data?.accounts?.[0] &&
                  `${supportedChains["0x" + Number(web3Data.chainId).toString(16)].chainName} (${web3Data?.chainId})`}
              </div>
            </Tooltip>
          </Avatar.Group>
        )}

        <div className={style.buttons}>
          {!web3Data?.accounts?.[0] ? (
            <>
              {
                <Button icon={<WalletOutlined />} className={style.button} onClick={loginWithInjectedWeb3}>
                  Connect with Metamask
                </Button>
              }
              <Button icon={<WalletOutlined />} className={style.button} onClick={() => loginWithWalletConnect(56)}>
                Connect with WalletConnect
              </Button>
            </>
          ) : (
            <Button icon={<DisconnectOutlined />} className={style.button} onClick={logout}>
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
