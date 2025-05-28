import Header from './Header';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
