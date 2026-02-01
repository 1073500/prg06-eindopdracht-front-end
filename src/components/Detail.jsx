import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

function Detail() {
    const [drawingPrompt, setDrawingPrompts] = useState(null);
    const params = useParams();
    const getDrawingPrompts = async () => {
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts/${params.id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            });
            const data = await response.json();
            if (!data.error) {
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
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Details</h1>
            {drawingPrompt ? (
                <div  className="bg-lime-500 p-2 rounded-b-2xl">
                    <div className=" bg-pink-200 rounded-lg p-4 m-4 flex flex-col ">
                        <div className="grid md:grid-cols-2 gap-4  ">
                            <h2 >Dier: {drawingPrompt.animal}</h2>
                            <h3 >Kleur: {drawingPrompt.color}</h3>
                            <h4>Woord: {drawingPrompt.word}</h4>
                            <div>
                                <Link className="bg-pink-400 font-semibold rounded-2xl p-2 m-2 transition hover:bg-pink-600"
                                      to={`/drawingprompts/${drawingPrompt.id}/edit`}>Pas aan</Link>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <p>Laden...</p>
            )}
        </div>
    );


}

export default Detail;