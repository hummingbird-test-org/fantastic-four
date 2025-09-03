import './App.css';
  import randomstring from "randomstring";


const App = () => {

  return (
    <div className="content">
      <h1>Test App</h1>
      <p>Random String - {randomstring.generate()}</p>
    </div>
  );
};

export default App;

