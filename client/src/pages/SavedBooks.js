import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// Importing useQuery and useMutation hooks 
import { useQuery, useMutation } from '@apollo/client';

// Importing Auth to later retrieve user-token and user information
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

//Importing our pre-defined query and mutation
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
	// Setting up our query with the option to monitor loading-status and saving the returned information in an object
	const { loading, data } = useQuery(GET_ME, {
		variables: { userId: Auth.getProfile().data._id },
	});
	// Saving the delete mutation as an object 
	const [deleteBook] = useMutation(DELETE_BOOK);

	// Saving user data in an object for re-use
	const userData = data?.user || {};

	const handleDeleteBook = async (bookId) => {
		
		
		// Retrieving user-token for authentication
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		
		if (!token) {
			return false;
		}
		
		// const user = Auth.getProfile().data;
		
		try {
			// Search through user's data to find the book with an ID matching the bookId parameter passed into the event handler
			const { __typename, ...deletedBook } = userData.savedBooks.find(
				(book) => book.bookId === bookId
			);
			// Delete book mutation
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
