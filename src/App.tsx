import MainBox from './components/MainBox';
import InputSection from './components/InputSection';
import {logoImage} from './assets/img/index'

function App() {
  return (
    <main className='h-100 d-flex align-items-center bg-dark'>
      <MainBox>
        <h1 className='text-center'>JSON Genius </h1>
        <div className='d-flex justify-content-between gap-4'>
          <img src={logoImage} alt="Logo do JSON Genius" className='w-25 h-25' />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <InputSection />
      </MainBox>
    </main>
  );
}

export default App;
