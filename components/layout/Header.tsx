import style from "../../styles/Header.module.sass";
import router from "next/router";
import { Button, Avatar, Tooltip, Menu, Dropdown } from "antd";
import { WalletOutlined, DisconnectOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useWeb3 } from "../../hooks/useWeb3";
import { supportedChains } from "../../utils/constant";
import detectEthereumProvider from "@metamask/detect-provider";
import { FC } from "react";

const Header: FC = () => {
  const { web3Data, loginWithInjectedWeb3, loginWithWalletConnect, logout, switchNetwork } = useWeb3();

  const login = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      loginWithInjectedWeb3();
    } else {
      // TODO: where to get chainId
      loginWithWalletConnect(97);
    }
  };
  // TODO: Deprecated, needs migration
  const chainMenu = (
    <Menu>
      {Object.keys(supportedChains).map((chain, id) => {
        return (
          <Menu.Item key={id}>
            <a
              onClick={() => {
                switchNetwork(Number(chain));
              }}
            >
              {supportedChains[chain].chainName}
            </a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      <div className={style.header}>
        <div
          className={style.imgs}
          onClick={() => {
            router.push("/");
          }}
        ></div>

        {
          <Dropdown overlay={chainMenu} trigger={["click"]}>
            <div className="ant-dropdown-link" style={{ marginRight: "10px" }}>
              Select Network <DownOutlined />
            </div>
          </Dropdown>
        }

        {web3Data?.accounts?.[0] && (
          <Avatar.Group /*size="large"*/ className={style.userInfo}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#f56a00" }}></Avatar>
            <Tooltip
              title={web3Data?.accounts?.[0].slice(0, 6) + "...." + web3Data?.accounts?.[0].slice(-4)}
              placement="top"
            >
              <div className="chain">{web3Data?.accounts?.[0] && web3Data?.chainId}</div>
            </Tooltip>
          </Avatar.Group>
        )}

        <div className={style.buttons}>
          {!web3Data?.accounts?.[0] ? (
            <Button icon={<WalletOutlined />} className={style.button} onClick={login}>
              Connect
            </Button>
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
