import React, { useStates } from 'react';
import DrawingPrompt from "./DrawingPrompt.jsx";



function DrawingPrompts() {
    const [drawingPrompts, setPrompts] = useStates([
        {id: 1, animal: "Bear.", color: "Yellow", word:"Sweet"},
    ]);




    return (
        <>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Imagination Animal Drawing Prompt </h1>
            <ul>
                {
                    drawingPrompts.map((drawingPrompt, index) => <li key={index}><DrawingPrompt drawingPrompt={drawingPrompt}/></li>)
                }
            </ul>
        </>
    );
}


export default DrawingPrompts;
