import { useReducer, useState } from 'react';
import Form from './Form';
import StatsCard from './StatsCard';
import { reducer } from '../reducer';

const defaultState = {
  urls: [],
  errorStatus: false,
  errorMessage: '',
};

const Stats = () => {
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(
    reducer,
    defaultState,
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (!url) {
      dispatch({ type: 'NO_VALUE' });
    } else {
      const id = state.urls.length
        ? state.urls[state.urls.length - 1].id + 1
        : 1;

      const newUrl = { id, url };

      dispatch({ type: 'ADD_URL', payload: newUrl });
      setUrl('');
    }
  };

  return (
    <section className="  bg-Gray p-6">
      <div className="mx-auto my-12 max-w-6xl">
        <Form
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          errorStatus={state.errorStatus}
          errorMessage={state.errorMessage}
        />
        <article className="mx-auto max-w-4xl py-8">
          <ul>
            {state.urls.map((link, index) => {
              console.log(link);
              return (
                <li
                  key={link.id}
                  className={`pl-4" flex flex-col justify-between rounded-md bg-white px-6 py-4 sm:flex-row sm:items-center sm:py-2 ${
                    index === state.urls.length - 1
                      ? 'mb-0'
                      : 'mb-4'
                  }`}
                >
                  <a href={link.url} target="blank">
                    {link.url}
                  </a>
                  <hr className=" mt-2 sm:hidden" />
                  <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
                    <a
                      href={link.url}
                      target="blank"
                      className="text-Cyan"
                    >
                      {link.url}
                    </a>
                    <button className="items mt-4 flex w-full flex-1 rounded-md bg-Cyan py-2 px-6 text-xl text-white hover:bg-opacity-70 sm:mx-0 sm:mt-0">
                      <a href="#" className=" mx-auto">
                        Copy
                      </a>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        {/* header and info */}
        <article className="mx-auto my-12 text-center">
          <h2 className="mt-8 text-3xl font-bold text-VeryDarkViolet sm:text-4xl">
            {' '}
            Advanced Statistics
          </h2>
          <p className="mx-auto mt-6 max-w-sm">
            {' '}
            Track how your links are performing across the
            web with our advanced statistics dashboard.
          </p>
        </article>
        {/* End of header and info */}
        {/* stats box */}
        <StatsCard />
      </div>
    </section>
  );
};

export default Stats;
