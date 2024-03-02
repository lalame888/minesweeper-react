import { GameStatus } from '@/interface';
import { useEffect, useState } from 'react';

export const useTimer = (gameStatus: GameStatus) => {
    const [time, setTime] = useState<number>(0);
    useEffect(()=>{
        let interval: NodeJS.Timeout;
        if (gameStatus === GameStatus['進行中']) {
            interval = setInterval(() => {
                setTime((oldTime)=> oldTime + 1);
            }, 1000);
        } else if (gameStatus === GameStatus['初始化']) {
            setTime(0);
        }
        return () => clearInterval(interval);
    },[gameStatus]);
    

    return { time };
};

export default useTimer;
