import { Provider } from 'react-redux'
import './App.css'
import LeaderBoard from './Features/LeaderBoard/LeaderBoard'
import Playground from './Features/Playground/PlayGround'
import { store } from './Slices/GameStore'
import Scoreboard from './Features/ScoreBoard/ScoreBoard'

function App() {

  return (
    <div className="app_wrapper">
      <Provider store={store}>
        <Scoreboard/>
        <LeaderBoard/>
        <Playground/>
      </Provider>
    </div>
  )
}

export default App
