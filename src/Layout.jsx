import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div>
            <header>
                <nav className="bg-green-800 text-white font-bold p-4 flex justify-evenly">
                    <Link to={`/drawingprompts`}>Drawing prompt</Link>
                    <Link to={`drawingprompts/create`}>Create a Prompt!</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;