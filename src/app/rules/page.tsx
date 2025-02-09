import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dumbbell, Joystick, MessageSquareWarning, Target } from 'lucide-react';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const objectives = [
  {
    description: "Cada fila contenga los números del 1 al 9 sin repetir."
  },
  {
    description: "Cada columna contenga los números del 1 al 9 sin repetir."
  },
  {
    description: "Cada una de las 9 subcuadrículas de 3x3 contenga los números del 1 al 9 sin repetir."
  },
]

const difficulties = [
  {
    description: "Fácil: Más números predefinidos en la cuadrícula.",
  },
  {
    description: "Intermedio: Menos números iniciales y mayor desafío.",
  },
  {
    description: "Difícil: Mínimos números revelados, ideal para jugadores avanzados.",
  },
]

const tools = [
  {
    description: "Notas: Puedes activar el modo de notas para escribir números pequeños en una casilla y analizar posibles opciones antes de decidir."
  },
  {
    description: "Borrar: Si te equivocas, usa el botón de borrar para eliminar un número o una nota."
  },
  {
    description: "Ayuda: Si te atascas, puedes usar el botón de ayuda para revelar elnúmero correcto en una casilla. ¡Úsalo con sabiduría!"
  },
]

const aditionalRules = [
  {
    description: "No puedes cambiar los números que ya estaban en la cuadrícula al inicio del juego."
  },
  {
    description: "Si introduces un número incorrecto, recibirás una advertencia."
  },
  {
    description: "Ganas cuando completas toda la cuadrícula siguiendo las reglas del Sudoku."
  },
]

function page() {

  return (
    <div className="w-full h-dvh flex flex-col">
      <div className='flex flex-col w-full break-words my-3'>
        <h1 className="text-4xl font-bold">Reglas del Sudoku</h1> 
        <p className='text-xl mt-3'>El objetivo del sudoku es rellenar una cuadrícula de 9 × 9 celdas (81 casillas) dividida en subcuadrículas de 3 × 3 (también llamadas "cajas" o "regiones") con las cifras del 1 al 9 partiendo de algunos números ya dispuestos en algunas de las celdas.</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5 lg:flex-row lg:flex-wrap">
        <Card className={`${cn("w-[380px]")}`}>
          <CardHeader>
            <CardTitle className="text-2xl mb-2 flex justify-center items-center ml-0 mr-auto">
              <Target color="red" className="mr-1" />
              Objetivo del Juego
            </CardTitle>
            <CardDescription className="text-md">
              El objetivo del Sudoku es llenar una cuadrícula de 9x9 con números
              del 1 al 9, asegurándote de que:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {objectives.map((v) => (
                <div
                  key={uuidv4()}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-md font-medium leading-none"></p>
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${cn("w-[380px]")}`}>
          <CardHeader>
            <CardTitle className="text-2xl mb-2 flex justify-center items-center ml-0 mr-auto">
              <Dumbbell className="mr-1" />
              Niveles de Dificultad
            </CardTitle>
            <CardDescription className="text-md">
              Puedes elegir entre tres niveles de dificultad:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {difficulties.map((v) => (
                <div
                  key={uuidv4()}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-md font-medium leading-none"></p>
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${cn("w-[380px]")}`}>
          <CardHeader>
            <CardTitle className="text-2xl mb-2 flex justify-center items-center ml-0 mr-auto">
              <Joystick className="mr-1" />
              Herramientas del Juego
            </CardTitle>
            <CardDescription className="text-md">
              Para ayudarte en tu partida, cuentas con las siguientes opciones:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {tools.map((v) => (
                <div
                  key={uuidv4()}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-md font-medium leading-none"></p>
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${cn("w-[380px]")}`}>
          <CardHeader>
            <CardTitle className="text-2xl mb-2 flex justify-center items-center ml-0 mr-auto">
              <MessageSquareWarning color="orange" className="mr-1" />
              Reglas Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {aditionalRules.map((v) => (
                <div
                  key={uuidv4()}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-md font-medium leading-none"></p>
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className='w-full text-center justify-center items-center pb-5'>
          <p className='text-xl mt-3'>¡Pon a prueba tu lógica y diviértete resolviendo el Sudoku! 🎯</p>
        </div>
      </div>
    </div>
  );
}

export default page