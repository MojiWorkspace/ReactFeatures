import React, {useState} from 'react';

class ClassCouner extends React.Component{
    /* Классовый компонент работает иначе, необходимо реализовать render функцию,
    которая будет возвращать jsx, в отличии от функционального элемента, еоторый jsx возвращает сразу
    без промежуточных функций 
    
    В классовом компоненте использовать хуки нельзя
    
    Классовый подход считается утаревшим, однкао может использоваться в некоторых проектах*/

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        /*Биндим контекст компонента в описанные методы */
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

    }

    increment() {
        this.setState({count: this.state.count + 1})
    }
    
    
    decrement() {
        this.setState({count: this.state.count - 1})
    }

    render() {
        /* Так как возвращаем не объект, то на return указываем круглые скобки */
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }

}

export default ClassCouner