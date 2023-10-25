import { Component, ReactNode } from 'react';
import styles from './Content.module.css';
import Item from '../Item/Item';

class Content extends Component {
  render(): ReactNode {
    return (
      <div className={styles['wrapper']}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    );
  }
}

export default Content;
