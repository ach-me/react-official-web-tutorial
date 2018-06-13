import React, { Component, createContext } from 'react';

const Context = createContext({});
const MyProvider = Context.Provider;
const MyConsumer = Context.Consumer;

const User = () => (
  <div>
    <UserProfile />
  </div>
);

const UserProfile = () => (
  <MyConsumer>
    {({ state }) => (
      <div>
        <h2>Profile page of {state.username}</h2>
        <UserDetails />
      </div>
    )}
  </MyConsumer>
);

const UserDetails = () => (
  <div>
    <MyConsumer>
      {({ state, actions }) => (
        <div>
          <p>Username: {state.username}</p>
          <p>First name: {state.firstName}</p>
          <p>Lastname: {state.lastName}</p>
          <p>Age: {state.age}</p>
          <button onClick={actions.sumAge}>Sum age</button>
          <button onClick={actions.restAge}>Rest age</button>
        </div>
      )}
    </MyConsumer>
  </div>
);

class App extends Component {
  state = {
    user: {
      username: 'jioke',
      firstName: 'Kingsley',
      lastName: 'Silas',
      age: 20,
    },
  };

  render() {
    return (
      <div>
        <MyProvider
          value={{
            state: this.state.user,
            actions: {
              sumAge: () => {
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    age: prevState.user.age + 1,
                  },
                }));
              },
              restAge: () => {
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    age: this.state.user.age - 1,
                  },
                }));
              },
            },
          }}
        >
          <User />
        </MyProvider>
      </div>
    );
  }
}

export default App;
