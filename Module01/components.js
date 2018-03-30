// Class Component
class Button extends React.Component {  
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue);
    };
    
      render() {
        return(
          <button onClick={this.handleClick}>
            +{this.props.incrementValue}
        </button>
      );
    }
  }
  
  // Functional Component
  const Result = (props) => {
      return (
        <div>{props.counter}</div>
    );
  };
  
  // Parent Class Component
  class App extends React.Component {
      state = { counter: 0 };
    
    incrementCounter = (incrementValue) => {
        this.setState( (prevState) => ({
        counter: prevState.counter + incrementValue
      }));
    }
    
      render() {
        return (
          <div>
            <Button incrementValue={1}  onClickFunction={this.incrementCounter} />
          <Button incrementValue={5}  onClickFunction={this.incrementCounter} />
          <Button incrementValue={10}  onClickFunction={this.incrementCounter} />
          <Button incrementValue={100}  onClickFunction={this.incrementCounter} />
          <Result counter={this.state.counter}/>
        </div>
      )
    }
  }
  
  // React only renders one Component which is the reason for using a parent Component
  ReactDOM.render(<App />, mountNode);