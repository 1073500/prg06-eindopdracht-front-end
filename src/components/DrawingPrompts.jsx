import React, {useEffect, useState} from 'react'
import DrawingPrompt from "./DrawingPrompt.jsx";


function DrawingPrompts() {
    const [drawingPrompts, setDrawingPrompts] = useState([]);

    const drawingPromptDeleted = (deletedDrawingPromptId) => {
        console.log("Prompt is deleted", deletedDrawingPromptId);
    }
    const getDrawingPrompts = async () => {
        console.log("haal prompts op");

        try {
            const response = await fetch("http://localhost:8000/drawingprompts", {//await kan alleen met async
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            });
            const data = await response.json();
            console.log(data); //data.items is de array met notities
            setDrawingPrompts(data.items);
        } catch (e) {
            console.error("Fout bij het ophalen van prompts:", e);
        }
    }

//1 keer uitvoeren met useEffect, start met een lege var
    useEffect(() => {
        getDrawingPrompts();
    }, []);


    return (
        <>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Drawing Prompts App</h1>
            <ul>
                {
                    drawingPrompts.map((drawingPrompt, index) => <li key={index}><DrawingPrompt drawingPrompt={drawingPrompt} drawingPromptDeleted={drawingPromptDeleted}/></li>)
                }
            </ul>
        </>
    )
}


export default DrawingPrompts;
