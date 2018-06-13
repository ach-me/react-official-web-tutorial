import React, { Component, createContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Context = createContext({});
const MyProvider = Context.Provider;
const MyConsumer = Context.Consumer;

const User = () => (
  <Card>
    <UserProfile />
  </Card>
);

const UserProfile = () => (
  <MyConsumer>
    {({ state }) => (
      <div>
        <Typography variant="display1" component="h2">
          Profile page of {state.username}
        </Typography>
        <UserDetails />
      </div>
    )}
  </MyConsumer>
);

const UserDetails = () => (
  <MyConsumer>
    {({ state, actions }) => (
      <div>
        <CardContent>
          <Typography variant="subheading" component="p">
            Username: {state.username}
          </Typography>
          <p>First name: {state.firstName}</p>
          <p>Lastname: {state.lastName}</p>
          <p>Age: {state.age}</p>
        </CardContent>
        <CardActions className="card-actions">
          <Button variant="text" color="primary" onClick={actions.sumAge}>
            Sum age
          </Button>
          <Button variant="raised" color="secondary" size="large" onClick={actions.restAge}>
            Rest Age
          </Button>
        </CardActions>
      </div>
    )}
  </MyConsumer>
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
      <Grid container>
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
      </Grid>
    );
  }
}

export default App;
