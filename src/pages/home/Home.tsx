import AvailableBooks from './components/availableBooks';
import BooksForm from './components/BooksForm';
import './Home.css';

function Home() {
  return (
    <>
      <div className="mb-4">
        <BooksForm />
      </div>
      <AvailableBooks />
    </>
  );
}

export default Home;
