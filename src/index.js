import React, { createContext, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const UserContext = createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

class App extends Component {
  state = {
    user: {
      username: 'jioke',
      firstName: 'Kingsley',
      lastName: 'Silas',
    },
  };

  render() {
    return (
      <div>
        <UserProvider value={this.state.user}>
          <User />
        </UserProvider>
      </div>
    );
  }
}

const User = () => (
  <div>
    <UserProfile />
  </div>
);

const UserProfile = () => (
  <UserConsumer>
    {context => (
      <div>
        <h2>Profile page of {context.username}</h2>
        <UserDetails />
      </div>
    )}
  </UserConsumer>
);

const UserDetails = () => (
  <div>
    <UserConsumer>
      {context => (
        <div>
          <p>Username: {context.username}</p>
          <p>First name: {context.firstName}</p>
          <p>Lastname: {context.lastName}</p>
        </div>
      )}
    </UserConsumer>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
