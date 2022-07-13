import 'material-symbols';
import '@/styles/globals.css';
import 'react-day-picker/dist/style.css';
import '@/styles/day-picker.css';
import '@/styles/index.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
