import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static PropTypes = {
    todo: PropTypes.object.isReqired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({editing: true})
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({editing: false})
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props

    let element = this.state.editing ? (
      <TodoTextInput text={todo.text} editing={this.state.editing} onSave={(text) => this.handleSave(todo.id, text)}/>)
      : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)}/>
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)}/>
        </div>
      )

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}