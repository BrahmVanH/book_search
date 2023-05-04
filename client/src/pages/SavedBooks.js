import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
	const { loading, data } = useQuery(GET_ME, {
		variables: { userId: Auth.getProfile().data._id },
	});
	const [deleteBook] = useMutation(DELETE_BOOK);
	// const userData = data?.user || {};

	const userData = data?.user || {};

	const handleDeleteBook = async (bookId) => {
		
		
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		
		if (!token) {
			return false;
		}
		
		// const user = Auth.getProfile().data;
		
		try {
			const { __typename, ...deletedBook } = userData.savedBooks.find(
				(book) => book.bookId === bookId
			);
			await deleteBook({
				variables: { userId: userData._id, bookData: deletedBook },
			});
			// upon success, remove book's id from localStorage
			removeBookId(bookId);

			// Optimistically update the user data to remove the deleted book from the list
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<div
				fluid
				className='text-light bg-dark p-5'>
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</div>
			<Container>
				<h2 className='pt-5'>
					{userData.savedBooks.length
						? `Viewing ${userData.savedBooks.length} saved ${
								userData.savedBooks.length === 1 ? 'book' : 'books'
						  }:`
						: 'You have no saved books!'}
				</h2>
				<Row>
					{userData.savedBooks.map((book) => {
						return (
							<Col
								md='4'
								key={book.bookId}>
								<Card border='dark'>
									{book.image ? (
										<Card.Img
											src={book.image}
											alt={`The cover for ${book.title}`}
											variant='top'
										/>
									) : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className='small'>Authors: {book.authors}</p>
										<Card.Text>{book.description}</Card.Text>
										<Button
											className='btn-block btn-danger'
											onClick={() => handleDeleteBook(book.bookId)}>
											Delete this Book!
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};

export default SavedBooks;
