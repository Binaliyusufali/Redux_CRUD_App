import { v4 } from 'uuid'
import { useState } from "react";
import BookCards from './components/BookCards';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { toast } from 'react-toastify';

function App() {
  // kitap stateleri
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('');
  const [inputError, setInputError] = useState(false);
  // modal stateleri
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);


  // input değişimini izler
  const handleChange = (e) => {
    setBookName(e.target.value);
  };

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn('Lütfen Kitap ismi gönderiniz', {autoClose: 2000});
      return;
    }
    
    // kitabı saklamak için obje oluşturma 
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    // oluşturulan objeyi kitaplar dizisine aktarma
    setBooks([...books, newBook])

    // eleman eklenince formun temizlenmesi
    setBookName('');

    toast.success('Kitap başarıyla eklendi', {autoClose: 2000});

  };

  // silinmede modal açma işlemi
  const handleModal = (id) => {
    //  id'yi state aktar
    setDeleteId(id);
    // modalı aç
    setShowDeleteModal(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // silinecek id'ye eşit olmayanları alıp diziye aktarırı
    const filred = books.filter((book) => book.id !== deleteId)

    setBooks(filred);

    // modalı kapat
    setShowDeleteModal(false);

    // silinme tamamlandı bildirimi
    toast.error('Kitap başarıyla silindi', {autoClose: 2000});

  };

  // Okundu butonuna tıklanılınca çalışır 
  const handleRead = (book) => {
    // okundu değerini tersine çevirme
    const updatedBook = { ...book, isRead: !book.isRead };

    // dizideki güncellenecek elemanın sırasını bulma
    const index = books.findIndex(
      (item) => item.id === book.id
    );

    const cloneBooks = [...books]
    cloneBooks[index] = updatedBook;

    // state günceller
    setBooks(cloneBooks);

  };

  const handleEditModal = (book) => {
    // düzenleneccek elemanı state aktar
    setEditItem(book);
    // modalı aç
    setShowEditModal(true);
  }

  // kitabı günceler
  const handleEditBook = () => {
    // sırayı bulma
    const index = books.findIndex((book) => book.id === editItem.id);
    // state kopya oluşturma
    const cloneBooks = [...books];
    // eski kitabı diziden çıkart yerine yenisini koy
    cloneBooks.splice(index, 1, editItem);
    // stati güncelle
    setBooks(cloneBooks);

    // modalı kapat
    setShowEditModal(false);

    toast.info('Kitap başarıyla güncellendi', {autoClose: 2000});

  }



  return (
    <div className="App">
      <header className="bg-info text-light py-3 fs-5 text-center">
        <h1>Kütüphanem</h1>
      </header>

      {/*form alanı */}
      <div className="container">
        { /*hata bildirimini ekrana basma*/
          inputError && (
            <div className="alert alert-danger mt-5 ">{inputError}</div>
          )
        }
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input placeholder="Kitap ismi giriniz..." onChange={handleChange}
            value={bookName} className="form-control shadow" type="search" />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {/* eğer state içerisi boş ile basılacak */}
        {books.length === 0 && (
          <h6>Henüz kitap eklenmedi</h6>
        )}
        {/* eğer state içerisi dolu ile basılacak */}
        {books.map((book) => (
          <BookCards
            key={book.id}
            book={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))
        }



      </div>
      {/* modallar */}
      {showDeleteModal && <DeleteModal handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} />}

      {
        showEditModal &&
        <EditModal
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
          handleEditBook={handleEditBook}
        />
      }
    </div>
  );
}

export default App;
