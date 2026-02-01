import React, { useEffect, useState } from 'react'
import DrawingPrompt from "./DrawingPrompt.jsx";

function DrawingPrompts() {
    const [drawingPrompts, setDrawingPrompts] = useState([]);
    const [page, setPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState(null);
    const limit = 4; // Set a limit for how many items per page

    const drawingPromptDeleted = (deletedDrawingPromptId) => {
        setDrawingPrompts(drawingPrompts.filter(prompt => prompt.id !== deletedDrawingPromptId));
    };

    const getDrawingPrompts = async () => {
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts/?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: { Accept: "application/json" }
            });
            const data = await response.json();

            setDrawingPrompts(data.items);
            setPaginationInfo(data.pagination);
        } catch (e) {
            console.error("Fout bij het ophalen van prompts:", e);
        }
    };

    useEffect(() => {
        getDrawingPrompts();
    }, [page]);

    return (
        <>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Drawing Prompts App</h1>

            <div className="bg-blue-950 text-white font-bold p-4 flex justify-between items-center">
                <p>Teken de prompt dat in het kaartje staat!</p>
                {paginationInfo && (
                    <span>Pagina {paginationInfo.currentPage} van {paginationInfo.totalPages}</span>
                )}
            </div>

            <ul className="grid md:grid-cols-2 gap-4">
                {drawingPrompts.map((drawingPrompt) => (
                    <li key={drawingPrompt.id}>
                        <DrawingPrompt drawingPrompt={drawingPrompt} drawingPromptDeleted={drawingPromptDeleted}/>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center items-center gap-4 p-6 bg-slate-100 mt-4">
                <button
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl disabled:bg-gray-400 transition"
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={!paginationInfo?._links?.previous}
                >
                    Vorige
                </button>

                <span className="font-bold text-pink-600">
                    {page}
                </span>

                <button
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl disabled:bg-gray-400 transition"
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={!paginationInfo?._links?.next}
                >
                    Volgende
                </button>
            </div>
        </>
    )
}

export default DrawingPrompts;