import type { Component } from 'solid-js';

import styles from './App.module.css';
import { Home } from './Home';

const App: Component = () => {
  return <>
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Money Counter</h1>
        <Home />
      </header>
      <main>
      </main>
    </div>
  </>;
};

export default App;
