// App.tsx main switcher, called from ./main.tsx
// if you want to run some other app, import it as App here.

import App from './Components/TwoCountingButtons.tsx'

export default function NewApp() {
  return (
    <div>
      <App />
    </div>
  );
}

