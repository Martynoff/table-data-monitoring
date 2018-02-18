import React from 'react';
import { List, AutoSizer } from "react-virtualized";
import { connect } from 'react-redux';
import Row from './row';
import { MONITORING_START, MONITORING_STOP } from "../../epics/tables";
import './index.css';

const ITEM_SIZE = 185;
const ROW_HEIGHT = 70;

class App extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: MONITORING_START });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: MONITORING_STOP });
  }

  componentWillReceiveProps() {
    this.grid.forceUpdateGrid();
  }

  renderRow (itemsPerRow, length, { index, isScrolling, key, style}) {
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, length);
    return <Row
      width={ITEM_SIZE}
      key={key}
      style={style}
      data={this.props.data.slice(fromIndex, toIndex)}
    />
  };

  render() {
    return (
      <AutoSizer>
        {
          ({ width, height }) => {
            const itemsPerRow = Math.floor(width / ITEM_SIZE);
            const rowCount = Math.ceil(this.props.data.length / itemsPerRow);
            return <List
              rowCount={rowCount}
              width={width}
              height={height}
              rowHeight={ROW_HEIGHT}
              rowRenderer={this.renderRow.bind(this, itemsPerRow, this.props.data.length)}
              ref={(grid) => this.grid = grid}
            />
          }
        }
      </AutoSizer>
    );
  }
}

export default connect(({ tables }) => ({ data: tables }))(App);
