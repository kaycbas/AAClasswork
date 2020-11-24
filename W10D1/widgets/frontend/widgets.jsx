import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Tabs from './tabs';
import Autocomplete from './autocomplete';


let tabs = [{
    title: 'tab1',
    content: 'tab1content'
}, 
{
   title: 'tab2',
    content: 'tab2content'
}]

let names = ['Kevin','San', "Amanda", "Ben"]
function Root(){
    return(
        <div>
            <Clock/>
            <Tabs tabs={tabs}/>
            <Autocomplete names={names}/>
        </div>
    )
}
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDOM.render(<Root/>, root);
});