import "bootstrap/dist/css/bootstrap.css";
import "../styles/custom.scss";
import "../styles/index.scss";
import "../styles/candidate.scss";
import "../styles/navbar.scss";
import "../styles/find_job.scss";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import Script from "next/script";
import { PersistGate } from "redux-persist/integration/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3G5SHJ8E7S"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3G5SHJ8E7S', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
