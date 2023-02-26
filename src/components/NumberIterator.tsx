import React from 'react';

export class NumberIterator extends React.Component<{},{count: number}>
{  
    state = {
        count: 0
    };

    mounted: boolean = false;

    render()
    {
        return (
            <div>
                <p>The count is: {this.state.count}</p>
                <button onClick={this.increment}>Add One</button>
            </div>
        );
    }

    increment = () =>
    {
        this.setState(
            prevState => ({count: prevState.count + 1})
        )
    };
}