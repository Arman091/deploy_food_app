import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/cart";
import ContextProvider from "./components/store/ContextProvider";
import Orders from "./components/layout/Orders";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isOrder, setOrder] = useState(false);

  const showCartHandler = () => {
    setCartOpen(true);
  };

  const hideCartHandler = () => {
    setCartOpen(false);
  };

  const orderHandler = () => {
    setOrder((state) => !state);
    console.log("triggred");
  };

  // The JSX for the home page.

  const renderContent = () => {
    if (isOrder) {
      return <Orders OrderHandler={orderHandler} />;
    } else {
      return (
        <>
          {isCartOpen && <Cart onClose={hideCartHandler} />}
          <Header onShowCart={showCartHandler} onOrder={orderHandler} />
          <main>
            <Meals />
          </main>
        </>
      );
    }
  };
  return (
    <ContextProvider>
      <Router>
        <Routes>
          {/* Single route with conditional rendering */}
          <Route path="/" element={renderContent()} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
