import {useState} from "react";


function Create({drawingPromptAdded}) {

    const [formData, setFormData] = useState({
        animal: "",
        color: "",
        body: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8000/drawingprompts/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            });
            const data = await response.json();
            if(response.status === 201){
                //link to detail
                //navigate(`/spots/${data.id}`)
            }else {
                console.log(data.error)
            }//val melding
            console.log("iets", data);
            drawingPromptAdded();
        } catch (error) {
            console.error("Fout bij het verzenden van het formulier:", error);
        }

    }


    // }, []);

    return (
        <div>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Maak een drawing prompt aan</h1>
            <form className="bg-slate-200 rounded-2xl p-2 m-4 flex flex-wrap items-center" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="animal">Dier:</label>
                    <input type="text" id="animal" name="animal" value={formData.animal}
                           onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="color">Kleur:</label>
                    <input type="text" id="color" name="color" value={formData.color}
                           onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="body">Woord</label>
                    <input type="text" id="body" name="body" value={formData.body}
                           onChange={handleInputChange}/>
                </div>
                <button className="bg-slate-400 rounded-2xl p-2 m-2 transition hover:bg-white" type="submit">Voeg prompt toe</button>
            </form>
        </div>

    );


}

export default Create;