import React from 'react';

class Headers extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let selected = this.props.selectedTab;
        let tabs = this.props.tabs.map((tab, idx) => {
            let title = tab.title;
            let className = '';
            if (idx === selected) {
                className = 'selected';
            } else {
                className = 'unselected';
            }
            return (
                <li
                    key={idx}
                    className={className}
                    onClick={() => this.props.onSelectedTab(idx)}>
                    {title}
                </li>
            )
        });

    return (<ul>{tabs}</ul>);
    }
}

export default Headers;