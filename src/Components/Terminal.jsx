import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/styles/Terminal.css';
import { getCommandObject } from '../Services/terminal';

class Terminal extends Component {
  state = {
    commandsHistory: [],
    currentCommand: ""
  }

  handleCommand = (e) => {
    e.preventDefault();
    const { currentCommand } = this.state;
    const textChunks = currentCommand.split(" ");
    let comObj;

    if (textChunks[0].toLowerCase() === "ut" && textChunks.length === 2)
      comObj = getCommandObject(textChunks[1].toLowerCase());
    else if(textChunks[0].toLowerCase() === "exit")
      return this.props.toggleTerminal();
    else
      comObj = getCommandObject();

    comObj.command = textChunks;
    const commandsHistory = [...this.state.commandsHistory, comObj];
    this.setState({ commandsHistory, currentCommand: "" });

    if (comObj.action) {
      if (comObj.action[0] === "redirect") {
        setTimeout(() =>
          this.props.navigate(comObj.action[1])
          , 500);
      }
      else if(comObj.action[0] === "open"){
        setTimeout(() =>
          window.open(comObj.action[1], "_blank")
          , 500);
      }
      else if(comObj.action[0] === "exit"){
        this.props.toggleTerminal(e, false);
      }
    }
  }

  handleChange = (e) => {
    const currentCommand = e.currentTarget.value;
    this.setState({ currentCommand });
  }

  getFormattedCommand = (commandObj) => {
    return (<article key={this.randomKey} className="command-container">
      <section className="command">
        {this.prefix}
        <span>
          {commandObj.command[0]}
        </span>&nbsp;
        <span className={commandObj.colorClass}>
          {commandObj.command[1]}
        </span>
      </section>
      <section className="command-response">
        {commandObj.response.split("\n").map(chunk => <span key={this.randomKey} className="block">{chunk}</span>)}
      </section>
    </article>);
  }

  focusInput = (e) => {
    e.currentTarget.querySelector(".input-block").focus();
  }

  get prefix() {
    return (<span className="terminal-preview-text">
      <span className="yellow-green">mock@terminal</span>
      <span className="sky-blue">~</span>$&nbsp;
    </span>);
  }

  get randomKey() {
    return String(Math.random()).slice(2);
  }

  render() {
    const { commandsHistory, currentCommand } = this.state;

    return (<div className="terminal p-halfr glass02 fade-appear-01" onClick={this.focusInput}>
      <div className="commands-history">
        {commandsHistory.map(item => this.getFormattedCommand(item))}
      </div>
      <form onSubmit={this.handleCommand} className="terminal-line">
        {this.prefix}
        <input type="text" name="command" className="input-block" autoComplete="false" autoCorrect="false" value={currentCommand} onChange={this.handleChange} autoFocus />
      </form>
    </div>);
  }
}

export default function TerminalWithRouter(props) {
  const navigate = useNavigate();
  return <Terminal {...props} navigate={navigate} />;
}