import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SurveyForm from './components/SurveyForm/SurveyForm';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <main data-theme='code-theme' className='bg-primary min-w-screen min-h-screen flex items-center justify-center'>
      <SurveyForm />
      <ToastContainer position='bottom-right' />
    </main>
  );
}

export default App;
