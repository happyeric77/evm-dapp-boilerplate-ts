import Class from "./Header.module.sass"
import router from 'next/router'
// Ant Design style
import { Button, Avatar, Tooltip } from 'antd';
import { WalletOutlined, DisconnectOutlined, UserOutlined } from '@ant-design/icons'


function Header({userAddr, chain, login, logout}) {


    const loginButtonData = {
        components: [<div key="1" className="connect">Connect</div>],
        width: "150px",
        callback: login
    }

    const logoutButtonData = {
        components: [<div key="1" className="disconnect">Disconnect</div> ],
        width: "150px",
        callback: logout
    }    

    return <>
        <div className={Class.header}>
            <div className={Class.imgs} onClick={()=>{router.push("/")}}></div>

            {userAddr && 
                <Avatar.Group /*size="large"*/ className={Class.userInfo} >
                    <Avatar icon={<UserOutlined/>} style={{ backgroundColor: '#f56a00' }}></Avatar>
                    <Tooltip title= {userAddr.slice(0,6)+ "...."+userAddr.slice(-4)} placement="top">
                        <div className="chain">{userAddr && chain}</div>
                    </Tooltip>
                </Avatar.Group>
            }

            <div className={Class.buttons}>
                {!userAddr ? 
                    <Button icon={<WalletOutlined />} className={Class.button} onClick={login}> Connect </Button>:
                    <Button icon={<DisconnectOutlined />} className={Class.button} onClick={logout}> Disconnect </Button>
                }
            </div>
            
        </div>
    </>
}
export default Header