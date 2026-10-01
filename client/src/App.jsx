/*function App() {
    return (
        <div className="App">
            <h1>Mueblería Hermanos Jota</h1>
            <p>Catálogo de muebles en desarrollo...</p>
        </div>
    );
}
export default App;
*/

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <ProductList />
            </main>

            <Footer />
        </>
    );
}

export default App;