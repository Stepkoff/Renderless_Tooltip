import { Tooltip } from "./components/Tooltip";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Tooltip text="delete">
        {(props) => (
          <button
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            Hover me
          </button>
        )}
      </Tooltip>
    </div>
  );
}
