import sendForm from './utils/send-form';
import './App.css';
import { useState } from 'react';
import { Message } from './lib/Message/Message';
import validateInput from './utils/validate-input';

function App() {
  const [response, setResponse] = useState(null);
  const [hashInput, setHashInput] = useState('');

  const handleInputChange = (ev) => {
    const newHash = ev.target.value.toLowerCase();
    setHashInput(newHash);

    try {
      validateInput(newHash);
      setResponse(null);
    } catch(e) {
      setResponse({
        type: 'error',
        message: e.message
      })
    }
  }

  return (
    <div className="App">
      <h1>
        Trufin test
      </h1>
      <p>
        This tool calculates the keccak256 hash summed with a nonce that is lower to the given input.
      </p>
      <form onSubmit={sendForm({hashInput, setResponse})}>
        <label htmlFor='hash'>256-bit hexadecimal hash : </label>
        <input className="hash-input" type="text" name="hash" onChange={handleInputChange} value={hashInput} />
        <button>Submit</button>
        {response && (
          <Message errorClass={response.type}>{response.message}</Message>
        )}
      </form>

    </div>
  );
}

export default App;
