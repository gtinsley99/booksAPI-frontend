const AllBooks = (props) => {
  const showAllBooks = () => {
    props.setShowAll(!props.showAll);
    if (props.showButton === "Show") {
      props.setShowButton("Hide");
    } else {
      props.setShowButton("Show");
    }
  };

  return (
    <div>
      <h2>All Books:</h2>
      <button onClick={showAllBooks}>{props.showButton}</button>
      {props.showAll ? (
        <div className="allBooks">
          <div>
            {!props.bookList ? (
              <p>Loading...</p>
            ) : (
              props.bookList.books.map((item, index) => {
                return (
                  <div key={index} className="bookBox">
                    <p>Title: {props.bookList.books[index].title}</p>
                    <p>Author: {props.bookList.books[index].author}</p>
                    {props.bookList.books[index].genre !==
                      (undefined || "") && (
                      <p>Genre: {props.bookList.books[index].genre}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="welcomeBox">
          <p>Welcome to the book API website!</p>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
