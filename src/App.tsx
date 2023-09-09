import SpotListing from "./components/SpotListing";
import "./App.css";

function App() {
    return (
        <>
            <div>
                <header className="h-[50vh]">
                    <img
                        className="h-[50vh] w-full object-cover"
                        src="cover.jpg"
                        alt=""
                    />
                </header>
                <section className="w-full relative">
                    <div className="w-full flex relative -top-20 justify-center">
                        <div className="flex-none"></div>
                        <div className="flex justify-center bg-white drop-shadow-lg p-6 w-2/3">
                            <SpotListing />
                        </div>
                        <div className="flex-none bg-gray-300"></div>
                    </div>
                </section>
                <footer className="h-[50vh] bg-blue-300"></footer>
            </div>
        </>
    );
}

export default App;
