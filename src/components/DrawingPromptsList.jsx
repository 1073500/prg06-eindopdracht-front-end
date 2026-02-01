import { useState, useEffect } from 'react';

function DrawingPromptsList() {
    const [prompts, setPrompts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchPrompts = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts?page=${page}&limit=6`);
            const data = await response.json();

            setPrompts(data.items);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Fout bij ophalen:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPrompts(currentPage);
    }, [currentPage]);

    const goToNextPage = () => {
        if (pagination && pagination._links.next) {
            setCurrentPage(pagination._links.next.page);
        }
    };

    const goToPreviousPage = () => {
        if (pagination && pagination._links.previous) {
            setCurrentPage(pagination._links.previous.page);
        }
    };

    return (
        <div>
            <h1>Tekenprompts</h1>

            {loading ? (
                <p>Laden...</p>
            ) : (
                <>
                    {/* Toon alle prompts */}
                    <div className="prompts-grid">
                        {prompts.map((prompt) => (
                            <div key={prompt._id} className="prompt-card">
                                <p>Dier: {prompt.animal}</p>
                                <p>Kleur: {prompt.color}</p>
                                <p>Object: {prompt.word}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination knoppen */}
                    {pagination && (
                        <div className="pagination">
                            <button
                                onClick={goToPreviousPage}
                                disabled={!pagination._links.previous}
                            >
                                ← Vorige
                            </button>

                            <span>
                                Pagina {pagination.currentPage} van {pagination.totalPages}
                                ({pagination.totalItems} totaal)
                            </span>

                            <button
                                onClick={goToNextPage}
                                disabled={!pagination._links.next}
                            >
                                Volgende →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default DrawingPromptsList;