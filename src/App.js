import React, { Component } from "react";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      newItem: ""
    };
  }

  //incorporating local storage
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user exits/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    //update react state
    this.setState({ [key]: value });
  }

  addItem() {
    //get new id to the newItem
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // destuctor into new list
    const list = [...this.state.list];

    // push newItem to the list
    list.push(newItem);

    //update the list and input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <>
        <div className="container-parent">
          <div className="container-nav">
            <div>
              <nav className="nav-title">To-do list</nav>
            </div>
          </div>
          <div className="container-field">
            <input
              className="text-field"
              type="text"
              placeholder="Type your task here..."
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />
            <button className="add-button" onClick={() => this.addItem()}>
              Add
            </button>

            <br />

            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {item.value}
                    <button
                      className="delete-button"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
