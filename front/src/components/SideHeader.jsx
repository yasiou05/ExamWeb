import React from "react";
import { Link } from 'react-router-dom';
import { BsChatSquareHeart, BsFillEnvelopeHeartFill, BsDiscord } from "react-icons/bs";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import { GiHollowCat } from "react-icons/gi";
import { IoLogoOctocat } from "react-icons/io";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { PiCat } from "react-icons/pi";
import { LiaDiscord, LiaTelegramPlane } from "react-icons/lia";
import { SiGnuicecat } from "react-icons/si";
import SidebarItem from './SidebarItem.jsx'
import './sideHeader.css';


const SideHeader = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "120px",
                height: "100vh",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                WebkitBackdropFilter: "blur(12px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div className="header-icon" style={{
                position: "absolute",
                top: "10px", marginTop: "20px"
            }}>
            </div>

            <div className="icon-list" style={{
                position: "absolute",
                bottom: "80px", marginBottom: "20px"
            }}>
                <div className="icon-item">
                    {/* <BsChatSquareHeart className="icon" /> */}
                    <SidebarItem iconClass="icon" icon={BsChatSquareHeart} label="Letters" text="Pookie when u go here u'll see our letters! go write me one  😾 " route="/letters" />
                </div>
                <div className="icon-item">
                    <a href="https://discord.gg/2tgZPgU3" target="__blank">
                        <SidebarItem iconClass="icon" icon={LiaDiscord} label="Discord" text="what can i say? ofc i created OUR discord server  😌 " route="/home" />
                    </a>

                </div>
                <div className="icon-item">
                    <SidebarItem iconClass="icon" icon={IoGameControllerOutline} label="Games" text="Well baby i have'nt thought about what to build yet so coming soon  🥺 " route="/games" />
                </div>
                {/* <div className="icon-item">
                    <BsFillEnvelopeHeartFill className="icon" />
                </div> */}
                <div className="icon-item" style={{ transform: "scale(0.9)" }}>
                    <SidebarItem iconClass="icon" icon={LiaTelegramPlane} label="Telegram" text="I wanted to create a Telegram bot for us but it's gonna take time baby  🫣 " route="/telegram" />
                </div>
                <div className="icon-item">
                    <SidebarItem iconClass="icon" icon={RiNeteaseCloudMusicLine} label="Music" text="Remember u told me to listen to music together? upload it hereeee  🥰 " route="/music" />
                </div>
                <div className="icon-item">
                    <SidebarItem iconClass="icon" icon={PiCat} label="Cat" text="You have no idea what this will be , and i'm not spoiling it just wait a bit 😡" route="/cat" />
                </div>
            </div>
        </div>
    );
};

export default SideHeader;
