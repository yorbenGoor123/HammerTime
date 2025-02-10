import { Provider } from "react-redux";
import "./App.css";
import LeaderBoard from "./Features/LeaderBoard/LeaderBoard";
import Playground from "./Features/Playground/PlayGround";
import { store } from "./Slices/GameStore";
import Scoreboard from "./Features/ScoreBoard/ScoreBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  
  const [queryClient] = useState(() => new QueryClient())

  return (
    <div className="app_wrapper">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Scoreboard />
          <LeaderBoard />
          <Playground />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
