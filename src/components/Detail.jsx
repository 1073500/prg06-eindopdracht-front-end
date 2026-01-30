import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

function Detail() {
    const [drawingPrompt, setDrawingPrompts] = useState(null);
    const params = useParams();
    const getDrawingPrompts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/drawingprompts/${params.id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            });
            const data = await response.json();
            if (!data.error){
                setDrawingPrompts(data)
            }

        } catch (e) {
            console.error("Fout bij het ophalen van prompts:", e);
        }
    }
    useEffect(() => {
        getDrawingPrompts();
    }, []);
    return (
        <div>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Show details</h1>
            {drawingPrompt ? (
                <div className=" bg-pink-200 rounded-lg p-4 m-4">
                    <h2 className="font-bold mb-2">{drawingPrompt.animal}</h2>
                    <h3 className="font-semibold mb-2">Door: {drawingPrompt.color}</h3>
                    <p>{drawingPrompt.body}</p>
                    <Link className="bg-pink-400 font-semibold rounded-2xl p-2 m-2 transition hover:bg-pink-600"
                          to={`/drawingprompts/${drawingPrompt.id}/edit`}>Pas aan</Link>
                </div>
            ):(
                <p>Laden...</p>
            )}
        </div>
    );


}

export default Detail;