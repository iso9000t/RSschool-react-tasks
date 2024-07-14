import { useState } from 'react';

function ErrorButton() {
  const [throwError, setThrowError] = useState<boolean>(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Test Error');
  }

  return <button onClick={handleClick}>Throw Error</button>;
}

export default ErrorButton;
