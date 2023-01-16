import { useEffect, useState } from 'react';
import { modifyLocalStorage } from 'helpers';

export const useSessionError = () => {
  const serverErrorMsg = modifyLocalStorage({ action: 'get', key: 'server_error' });
  const [sessionError, setSessionError] = useState<string>(serverErrorMsg);

  useEffect(() => {
    if (serverErrorMsg) {
      const error = JSON.parse(serverErrorMsg);
      if ('statusCode' in error && 'message' in error) {
        setSessionError('Your last session was expired');
      }
    }
  }, [serverErrorMsg]);

  return { sessionError, setSessionError };
};
