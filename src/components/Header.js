import React, { useEffect, useState } from 'react';
import styles from '../Styles.module.css';

export default function Header({ logout }) {
    const [timeLeft, setTimeLeft] = useState(59 * 60);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    setSessionExpired(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header>
            <div className={styles.app_name_container}>
                <p>Jammming <br /><span>Spotify Playlist Creator</span></p>
            </div>
            {sessionExpired ? (
                <p className={styles.countdown}>Session has expired</p>
            ) : (
                <p className={styles.countdown}>Session expires in: {timeLeft}</p>
            )}
            <button className={styles.logout_btn} onClick={logout}>Log Out</button>
        </header>
    )
};
