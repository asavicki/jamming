import React, { useEffect, useState } from 'react';
import styles from '../Styles.module.css';

export default function Header({ logout }) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        const expiryTime = localStorage.getItem('tokenExpiry');
        if (!expiryTime) {
            setSessionExpired(true);
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.floor((expiryTime - now) / 1000); // in seconds

            if (remaining > 0) {
                setTimeLeft(remaining);
            } else {
                setSessionExpired(true);
                setTimeLeft(0);
                logout(); // auto-logout when time is up
            }
        };

        updateTimer(); // run immediately on mount
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [logout]);

    return (
        <header>
            <div className={styles.app_name_container}>
                <p>Jammming <br /><span>Spotify Playlist Creator</span></p>
            </div>
            {sessionExpired ? (
                <p className={styles.countdown}>Session has expired</p>
            ) : (
                <p className={styles.countdown}>
                    Session expires in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                </p>
            )}
            <button className={styles.logout_btn} onClick={logout}>Log Out</button>
        </header>
    );
}
