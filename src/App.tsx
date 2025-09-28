import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReceiptScreen } from './screens/ReceiptScreen';
import { FormScreen } from './screens/FormScreen';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormScreen />} />
        <Route path='/receipter' element={<ReceiptScreen />} />
      </Routes>
    </BrowserRouter>
  );
};