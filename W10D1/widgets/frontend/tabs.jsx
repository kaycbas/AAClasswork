import React from 'react';
import Headers from './headers'

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 0};
    }

    selectTab(num) {
        this.setState({selectedTab: num});
    }

    render() {
        let tabs = this.props.tabs;
        tabs = tabs.map((tab, idx) => {
        return (<li key={idx}>{tab.title}</li>)
        })
        let selectedTab = this.props.tabs[this.state.selectedTab];
        return (
            <div>
                <ul>
                    <Headers 
                        selectedTab={this.state.selectedTab} 
                        onSelectedTab={this.selectTab}  
                        tabs={this.props.tabs}>
                    </Headers>
                </ul>
                <article>
                    {selectedTab.content}
                </article>
            </div>
        )
    }
}






export default Tabs