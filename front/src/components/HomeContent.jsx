import React, { useState, useEffect } from "react";
import '../pages/home.css';
// HAPPY MODEL IMPORTS
// import HappyModel from "./HappyModel";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

const HomeContent = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const getFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };
    const getLocalTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // optional: set to true for AM/PM format
        });
    };
    useEffect(() => {
        // Date/time updater
        const updateDateTime = () => {
            const now = new Date();

            const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(
                now.getDate()
            ).padStart(2, '0')}`;

            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });

            setDate(formattedDate);
            setTime(formattedTime);
        };

        updateDateTime(); // set immediately
        const intervalId = setInterval(updateDateTime, 1000); // then every second

        // Cleanup on unmount
        return () => {
            clearInterval(intervalId);
        };
    })

    return (
        <div
            className="home-content"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                className="glass-moon"
                style={{
                    width: "400px",
                    height: "400px",
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
                    zIndex: 10,
                    borderRadius: "100px",
                    position: "relative",
                }}
            >
                {/* TIME TEXT */}
                <div className="time-text">
                    Now Is: {time}
                </div>
                {/* IMAGE */}
                <div className="home-image">
                </div>
                {/* HAPPY MODEL */}
                {/* <div style={{ width: '400px', height: '400px' }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <HappyModel scale={[2, 2, 2]} position={[0, -1.2, 0]} />
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </div> */}
            </div>
        </div>
    )
}

export default HomeContent;