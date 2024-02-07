import React from 'react'

const BookCards = ({ book, handleModal, handleRead, handleEditModal }) => {
    return (
        <div className='d-flex border rounded shadow p-3 mt-3 justify-content-between align-items-center'>
            <div>
                <h5>
                    {book.title}
                </h5>
                <p>{book.date}</p>
            </div>
            <div className='btn-group'>
                <button className='btn btn-danger'
                    onClick={() => handleModal(book.id)}>
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button className='btn btn-primary' 
                    onClick= {() => handleEditModal(book)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    className='btn btn-success'
                    onClick={() => handleRead(book)}>
                    {
                        book.isRead ? "Okundu" : "Okunmadı"
                    }
                </button>
            </div>
        </div>
    )
}

export default BookCards
