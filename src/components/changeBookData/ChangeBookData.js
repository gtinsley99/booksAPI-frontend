import { useState } from "react";
import {
  Booksapi,
  AddBookapi,
  DeleteBookapi,
  UpdateBookapi,
} from "../../utils";

const ChangeBookData = (props) => {
  // Add
  const [addTitle, setAddTitle] = useState();
  const [addAuthor, setAddAuthor] = useState();
  const [addGenre, setAddGenre] = useState();
  // Delete
  const [delTitle, setDelTitle] = useState();
  // Update
  const [updTitle, setUpdTitle] = useState();
  const [updAuthor, setUpdAuthor] = useState();
  const [updGenre, setUpdGenre] = useState();

  // Activate buttons
  // del
  const [delButton, setDelButton] = useState(true);
  // add
  const [addButton, setAddButton] = useState(true);
  const [addTitleInput, setAddTitleInput] = useState(false);
  const [addAuthorInput, setAddAuthorInput] = useState(false);
  // Update
  const [updButton, setUpdButton] = useState(true);
  const [updTitleInput, setUpdTitleInput] = useState(false);
  const [updAuthorInput, setUpdAuthorInput] = useState(false);
  const [updGenreInput, setUpdGenreInput] = useState(false);

  // Functions to store input values and activate submit button when required inputs filled in

  // Delete book function
  const delActivate = (e) => {
    setDelTitle(e.target.value);
    if (e.target.value !== "") {
      setDelButton(false);
    } else {
      setDelButton(true);
    }
  };

  // Add a book functions
  const addTitleActivate = (e) => {
    setAddTitle(e.target.value);
    if (e.target.value !== "" && addAuthorInput === true) {
      setAddTitleInput(true);
      setAddButton(false);
    } else if (e.target.value !== "") {
      setAddTitleInput(true);
      setAddButton(true);
    } else {
      setAddTitleInput(false);
      setAddButton(true);
    }
  };

  const addAuthorActivate = (e) => {
    setAddAuthor(e.target.value);
    if (e.target.value !== "" && addTitleInput === true) {
      setAddAuthorInput(true);
      setAddButton(false);
    } else if (e.target.value !== "") {
      setAddAuthorInput(true);
      setAddButton(true);
    } else {
      setAddAuthorInput(false);
      setAddButton(true);
    }
  };

  // Update a book functions
  const updTitleActivate = (e) => {
    setUpdTitle(e.target.value);
    if (
      e.target.value !== "" &&
      (updAuthorInput === true || updGenreInput === true)
    ) {
      setUpdTitleInput(true);
      setUpdButton(false);
    } else if (e.target.value !== "") {
      setUpdTitleInput(true);
      setUpdButton(true);
    } else {
      setUpdTitleInput(false);
      setUpdButton(true);
    }
  };

  const updAuthorActivate = (e) => {
    setUpdAuthor(e.target.value);
    if (e.target.value !== "" && updTitleInput === true) {
      setUpdAuthorInput(true);
      setUpdButton(false);
    } else if (e.target.value === "" && updTitleInput === true && updGenreInput === true) {
      setUpdAuthorInput(false);
      setUpdButton(false);
    } else if (e.target.value !== "") {
      setUpdAuthorInput(true);
      setUpdButton(true);
    } else {
      setUpdAuthorInput(false);
      setUpdButton(true);
    }
  };

  const updGenreActivate = (e) => {
    setUpdGenre(e.target.value);
    if (e.target.value !== "" && updTitleInput === true) {
      setUpdGenreInput(true);
      setUpdButton(false);
    } else if (e.target.value === "" && updTitleInput === true && updAuthorInput === true) {
      setUpdGenreInput(false);
      setUpdButton(false);
    } else if (e.target.value !== "") {
      setUpdGenreInput(true);
      setUpdButton(true);
    } else {
      setUpdGenreInput(false);
      setUpdButton(true);
    }
  };

  // Submit functions
  const addSubmitHandler = async (e) => {
    e.preventDefault();
    AddBookapi(addTitle, addAuthor, addGenre, props.setErrors);
    Booksapi(props.setBookList);
    if (props.error === null) {
      props.setModTitle(addTitle);
      props.setMethod("added");
    } else {
      props.setModTitle("");
      props.setMethod("Error - Book not added");
    };
    setAddTitle("");
    setAddAuthor("");
    setAddGenre("");
    setAddButton(true);
    props.setShowModal(true);
  };

  const deleteSubmitHandler = async (e) => {
    e.preventDefault();
    
    DeleteBookapi(delTitle, props.setErrors);
    Booksapi(props.setBookList);
    if(props.error === null){
      props.setModTitle(`Title: ${delTitle}`);
      props.setMethod("Book deleted");
    } else {
      props.setModTitle("");
      props.setMethod("Error - Book not deleted");
    };
    setDelTitle("");
    setDelButton(true);
    props.setShowModal(true);
  };

  const updateSubmitHandler = async (e) => {
    e.preventDefault();
    UpdateBookapi(updTitle, updAuthor, updGenre, props.setErrors);
    Booksapi(props.setBookList);
    if (props.errors === null){
    props.setModTitle(`Title: ${updTitle}`);
    props.setMethod("Book updated");
    } else {
      props.setModTitle("");
      props.setMethod("Error - Book not updated");
    }
    setUpdTitle("");
    setUpdAuthor("");
    setUpdGenre("");
    setUpdButton(true);
    props.setShowModal(true);
  };

  return (
    <div className="formCard">
      <form className="bookForm" onSubmit={deleteSubmitHandler}>
        <input
          placeholder="Insert title to delete..."
          value={delTitle}
          onChange={delActivate}
        ></input>
        <button className="submitBtn" type="submit" disabled={delButton}>
          Delete book
        </button>
      </form>

      <form className="bookForm" onSubmit={addSubmitHandler}>
        <input
          placeholder="Insert title here..."
          onChange={addTitleActivate}
          value={addTitle}
        ></input>
        <input
          placeholder="Insert author here..."
          onChange={addAuthorActivate}
          value={addAuthor}
        ></input>
        <input
          placeholder="Insert genre here..."
          onChange={(e) => setAddGenre(e.target.value)}
          value={addGenre}
        ></input>
        <button className="submitBtn" type="submit" disabled={addButton}>
          Add book
        </button>
      </form>

      <form className="bookForm" onSubmit={updateSubmitHandler}>
        <input
          placeholder="Title of book to update..."
          onChange={updTitleActivate}
          value={updTitle}
        ></input>
        <input
          placeholder="Insert author here..."
          onChange={updAuthorActivate}
          value={updAuthor}
        ></input>
        <input
          placeholder="Insert genre here..."
          onChange={updGenreActivate}
          value={updGenre}
        ></input>
        <button className="submitBtn" type="submit" disabled={updButton}>
          Update book
        </button>
      </form>
    </div>
  );
};

export default ChangeBookData;
