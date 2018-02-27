import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const style = {
  margin: 20,
  display: 'inline-block'
};

const GridItem = ({ item }) => (
  <div>
    <Link to={item.id}>
      <ListItem primaryText={item.name} />
    </Link>
  </div>
);

const GridList = ({ list }) => (
  <div>
    <Paper style={style} zDepth={1}>
      <Subheader>{list.name}</Subheader>
      <List>
        {list.grids.map(item => <GridItem item={item} key={item.name} />)}
      </List>
    </Paper>
  </div>
);

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          name: 'cartoons',
          grids: [
            { name: 'Pokemon', id: 'SJMAKVQ_G' },
            { name: 'Simpsons', id: 'SJv2cNQOz' }
          ]
        },
        {
          name: 'movies',
          grids: [
            { name: 'Star Wars', id: 'BJBlj4mdz' },
            { name: 'Star Trek', id: 'Hkl1u4Xuf' },
            { name: 'Muppets', id: 'SkzKu47uf' }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <div className="lists-content">
        <div className="lists-display">
          {this.state.lists.map(list => (
            <GridList list={list} key={list.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default Lists;
