import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StroreState } from '../reducers';

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

export class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = { fetching: false };
    }
    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onTodoClick = (id: number): void => {
        this.props.deleteTodo(id);
    };
    onButtonClick = (): void => {
        this.props.fetchTodos();
        this.setState({ fetching: true });
    }
    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return (
                <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
                    {todo.title}
                </div>
            );
        });
    }
    render() {
        console.log(this.props.todos);

        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch</button>
                {this.state.fetching ? 'LOADING' : null}
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = ({ todos }: StroreState): { todos: Todo[] } => {
    return { todos };
}

export const App = connect(
    mapStateToProps,
    { fetchTodos, deleteTodo }
)(_App);