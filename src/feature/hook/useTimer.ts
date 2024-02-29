import { GameStatus } from '@/interface';
import { AppDispatch, gameAction, useReduxSelector } from '@/redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useTimer = () => {
    const time = useReduxSelector((state)=> state.game.time);
    const gameStatus = useReduxSelector((state)=> state.game.gameStatus);
    const dispatch: AppDispatch = useDispatch();
    const isRunning = gameStatus === GameStatus['進行中'];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                dispatch(gameAction.incrementTime());
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, dispatch]);

    const startTimer = () => {
        dispatch(gameAction.continueTime());
    };

    const stopTimer = () => {
        dispatch(gameAction.pauseTime());
    };

    return { time, isRunning, startTimer, stopTimer };
};

export default useTimer;
