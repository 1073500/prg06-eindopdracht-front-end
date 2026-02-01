import {Link} from "react-router";
import {useState} from "react";

function DrawingPrompt({drawingPrompt, drawingPromptDeleted}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteDrawingPrompt = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts/${drawingPrompt.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                }
            });

            if (response.status === 204) {
                drawingPromptDeleted(drawingPrompt.id);
            } else {
                setIsDeleting(false);
            }
        } catch (e) {
            setIsDeleting(false);
            console.log(e);
        }
    }

    return (
        <div className="flex-col bg-pink-600 p-4 rounded-2xl m-4 hover:transition">
            <div className="bg-amber-300 rounded-2xl p-4 mb-4">
                <h2 className=" bg-pink-100 rounded-3xl p-4  ">Dier: {drawingPrompt.animal}</h2>
                <h3 className="bg-pink-100 rounded-3xl p-4 ">Kleur: {drawingPrompt.color}</h3>
                <h3 className="bg-pink-100 rounded-3xl p-4 ">Woord: {drawingPrompt.word}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-2 bg-green-700 rounded-2xl">
                <Link className="bg-pink-400 text-center rounded-2xl p-2 m-2 transition hover:bg-lime-600"
                      to={`/drawingprompts/${drawingPrompt.id}`}>Lees meer</Link>
                <button className="bg-pink-400 rounded-2xl p-2 m-2 transition hover:bg-lime-600 disabled:opacity-50"
                        onClick={deleteDrawingPrompt} disabled={isDeleting}>
                    {isDeleting ? "Verwijderen..." : "Verwijder"}
                </button>
            </div>
        </div>
    )
}

export default DrawingPrompt;