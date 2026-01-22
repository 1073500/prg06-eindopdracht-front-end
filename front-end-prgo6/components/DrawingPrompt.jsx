//import {Link} from "react-router";
import drawingPrompts from "./DrawingPrompts.jsx";

function DrawingPrompt({prompt, setPrompt}) {

    return (
        <div
            className="flex-col items-center text-center bg-pink-100 p-4 rounded-2xl m-4 hover:transition hover:border hover:border-pink-500">
            <h1 className=" font-bold rounded-2xl p-2 m-2 ">Animal: {drawingPrompts.animal}</h1>
            <h2 className="font-semibold rounded-2xl p-2 m-2 ">Color: {drawingPrompts.color}</h2>
            <h2 className="font-semibold rounded-2xl p-2 m-2 ">Word: {drawingPrompts.word}</h2>
        </div>
    )
}

export default DrawingPrompt;