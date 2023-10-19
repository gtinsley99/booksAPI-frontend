import "./App.css";
import { useState, useEffect } from "react";

// API routes
import { Booksapi } from "./utils/index";

// components
import Title from "./components/title/Title";
import AllBooks from "./components/allBooks/AllBooks";
import ChangeBookData from "./components/changeBookData/ChangeBookData";
import Modal from "./components/modal/Modal";

function App() {
  // Errors on fetch
  const [errors, setErrors] = useState(null);
  // All book list
  const [showAll, setShowAll] = useState(false);
  const [showButton, setShowButton] = useState("Show");
  const [bookList, setBookList] = useState(false);
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [crud, setCrud] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    Booksapi(setBookList);
  });

  return (
    <div className="App">
      <Title />
      <AllBooks
        showAll={showAll}
        showButton={showButton}
        setShowAll={setShowAll}
        setShowButton={setShowButton}
        bookList={bookList}
      />
      {showModal && (
        <Modal setShowModal={setShowModal} method={crud} title={title} errors={errors} setErrors={setErrors}/>
      )}
      <ChangeBookData
        setBookList={setBookList}
        setMethod={setCrud}
        setModTitle={setTitle}
        setShowModal={setShowModal}
        setErrors={setErrors}
        errors={errors}
      />
    </div>
  );
}

export default App;
