import ReactDOM from 'react-dom';
import React from 'react';
import {LocalistComponent} from './dist';

const localistRun = props => {
    const {
        target,
        heading,
        calendarurl,
        apikey,
        format,
        entries,
        daysahead,
        depts,
        group,
        keyword,
        hidedescription,
        truncatedescription,
        hideimages,
        hideaddcal,
        hidepagination,
        filterby,
        wrapperclass,
        listclass,
        itemclass,
        readmore,
        url,
    } = props;
    if (typeof document === 'undefined' || !document.getElementById(target)) {
        console.warn(`invalid target: ${target}`);
        return;
    }
    ReactDOM.render(<LocalistComponent
        target= {target}
        depts= {depts}
        entries= {entries}
        daysahead= {daysahead}
        format= {format}
        group= {group}
        keyword= {keyword}
        heading= {heading}
        filterby= {filterby}
        calendarurl= {calendarurl}
        apikey= {apikey}
        hideaddcal= {hideaddcal}
        hidedescription= {hidedescription}
        truncatedescription= {truncatedescription}
        hideimages= {hideimages}
        hidepagination = {hidepagination}
        wrapperclass= {wrapperclass}
        listclass= {listclass}
        itemclass= {itemclass}
        readmore= {readmore}
        url= {url}
    />, document.getElementById(target));
}
// Add localist to the dom.
if (typeof window !== 'undefined'){
    window.localistViewer = localistRun;
}
export default localistRun;
