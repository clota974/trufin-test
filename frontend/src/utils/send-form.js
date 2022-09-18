import validateInput from "./validate-input";

export default function sendForm({
    hashInput, setResponse
}) {
    return async (ev) => {
        ev.preventDefault();
        try {
            validateInput(hashInput);
            const response = await fetch(process.env.REACT_APP_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hashInput })
            })
    
            const data = await response.json();
            setResponse(data)    
        } catch(e) {
            setResponse({
                type: 'error',
                message: e.message
            });
        }
    }
}

