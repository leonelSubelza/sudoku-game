import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { GameStatus } from '@/model/enums';
import { Pause, Play } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react'

function Chronometer() {

  const { time,setTime,gameState,setGameState } = useContext(gameStateContext) as GameStateContextType;

  // Estado para llevar la cuenta del tiempo (en segundos)
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  // Estado para saber si el cronómetro está corriendo
  const [running, setRunning] = useState<boolean>(false);
  // useRef para almacenar la referencia del intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeRunning = () => {
    if(gameState === GameStatus.FINISHED) {
      stop();
      return;
    }
    if(gameState === GameStatus.PLAYING){
      start();
      return;
    }
  }

  useEffect(() => {
    handleTimeRunning();
  },[])

  useEffect(() => {
    setTime(parseTime(timeInSeconds));
  },[timeInSeconds])

  useEffect(() => {
    handleTimeRunning();
  },[gameState])

  // useEffect(() => {
  //   if(time === '00:00:00') {
  //     setRunning(false);
  //   }
  // },[time])

  // useEffect que se activa cuando cambia el estado "running"
  useEffect(() => {
    // Si está corriendo, iniciamos un intervalo que incrementa el tiempo cada segundo
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeInSeconds(prevTime => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      // Si no está corriendo, limpiamos el intervalo
      clearInterval(intervalRef.current);
    }
    // Cleanup: se limpia el intervalo al desmontar el componente o al cambiar la dependencia
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const continueGame = () => {
    setRunning(true);
    setGameState(GameStatus.PLAYING);
  }

  // Función para iniciar el cronómetro
  const start = () => {
    setTimeInSeconds(0);
    setRunning(true);
  };

  // Función para pausar el cronómetro
  const stop = () => {
    setRunning(false);
    setGameState(GameStatus.PAUSED);
  };

  // Función para reiniciar el cronómetro
  const reset = () => {
    setRunning(false);
    setTime('00:00:00');
  };

  // Función opcional para formatear el tiempo (hh:mm:ss)
  const parseTime = (segundos: number) => {
    const getSeconds = `0${segundos % 60}`.slice(-2);
    const minutes = Math.floor(segundos / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(segundos / 3600)}`.slice(-2);
    return `${getHours==='00'?'':'00:'}${getMinutes}:${getSeconds}`;
  };

  return (
    <>
      <span>{time}</span>
      {running ? 
      <Pause className='ml-1 size-[18px] hover:cursor-pointer' onClick={stop}/> 
      : 
      <Play className='ml-1 size-[18px] hover:cursor-pointer' onClick={continueGame}/>}
    </>
  );
}

export default Chronometer;