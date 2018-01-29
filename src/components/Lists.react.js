import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const style = {
  margin: 20,
  display: 'inline-block',
};

const GridItem = ({item}) => (
  <div>
    <Link to={item.id} ><ListItem primaryText={item.name} /></Link>
  </div>
)

const GridList = ({list}) => (
  <div>
    <Paper style={style} zDepth={1}>
      <Subheader>{list.name}</Subheader>
      <List>
        {list.grids.map(item=> <GridItem item={item} key={item.name}/>)}
      </List>
    </Paper>
  </div>
)

class Lists extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [
        {
          name: "cartoons",
          grids: [
            {name: "Pokemon", id: ""},
            {name: "Simpsons", id: ""},
            {name: "Akira", id: ""},
            {name: "Beyblade", id: ""},
          ]
        },
        {
          name: "movies",
          grids: [
            {name: "Star Wars", id: ""},
            {name: "Star Trek", id: ""},
            {name: "Top Gun", id: ""},
            {name: "Muppets", id: ""},
          ]
        },
        {
          name: "TV shows",
          grids: [
            {name: "TMNT", id: ""},
            {name: "Smurfs", id: ""},
            {name: "A-Team", id: ""},
            {name: "ST:TNG", id: ""},
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div className="lists-content">
        This page will store lists of pre-made grids. These lists are currently for display only and all links go to the word search generator.
        <div className="lists-display">
          {this.state.lists.map(list=><GridList list={list} key={list.name} />)}
        </div>
      </div>
    )
  }
}

export default Lists
