import {Link} from "react-router";

function DrawingPrompt({drawingPrompt, drawingPromptDeleted}) {
    const deleteDrawingPrompt = async () => {
        try {
            //https:////`${}`
            const response = await fetch(`http://localhost:8000/drawingprompts/${drawingPrompt.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                }
            });
            console.log(response)
            if (response.status === 204) {
                drawingPromptDeleted(drawingPrompt.id);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div
            className="flex-col items-center text-center bg-pink-100 p-4 rounded-2xl m-4 hover:transition hover:border hover:border-pink-500">
            <h1 className=" font-bold rounded-2xl p-2 m-2 ">Titel: {drawingPrompt.animal}</h1>
            <h2 className="font-semibold rounded-2xl p-2 m-2 ">Door: {drawingPrompt.color}</h2>
            <Link className="bg-pink-400 font-semibold rounded-2xl p-2 m-2 transition hover:bg-pink-600"
                  to={`/drawingprompts/${drawingPrompt.id}`}>Lees meer</Link>
            <button className="bg-pink-400 font-semibold rounded-2xl p-2 m-2 transition hover:bg-pink-600"
                    onClick={deleteDrawingPrompt}>Verwijder
            </button>
        </div>

    )
}

export default DrawingPrompt;