import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Creating a new apollo client to communicate with back end 

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route
							exact
							path='/'
							component={SearchBooks}
						/>
						<Route
							exact
							path='/saved'
							component={SavedBooks}
						/>
						<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
					</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;
