import React, { useEffect, useRef, useState } from 'react';
import './InfiniteScroll.scss';

export default function InfiniteScroll() {
    let container = useRef();

    const [state, setState] = useState({
        items: [],
        previousObserveElement: null,
        observer: null
    });

    const fetchData = async () => {
        let items = null;
        await fetch('http://localhost:8000/api/get-dummy-order-history-data').then(res => {
            return res.json();
        }).then(response => {
            items = response;
            setState(state => {
                return {
                    ...state,
                    items: state.items?.concat(items)
                };
            }
            );
        });
    }

    useEffect(() => {
        let observer = null;
        (async () => {
            await fetchData();
            const root = document.getElementById('observer-root');
            observer = new IntersectionObserver(async (entries) => {
                if (entries[0].intersectionRatio !== 0) {
                    await fetchData();
                }
            }, {
                root: root,
                threshold: 1.0,
                rootMargin: '0px 0px 200px 0px'
            });
            setState((state) => {
                return {
                    ...state,
                    observer: observer
                };
            });
        })();

    }, []);

    useEffect(() => {
        if (state.observer) {
            if (state.previousObserveElement) {
                state.observer.unobserve(state.previousObserveElement);
            }
            const observeElement = document.getElementById(`observe-${state.items?.length - 1}`);
            if (observeElement) {
                state.observer.observe(observeElement);
                setState(state => {
                    return {
                        ...state,
                        previousObserveElement: observeElement
                    };
                }
                );
            }
        }
    }, [state.items, state.observer]);


    return (
        <div className="InfiniteScroll" ref={container}>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Edit Time</th>
                                <th>User Name</th>
                                <th>Type</th>
                                <th>Changed Value</th>
                            </tr>
                        </thead>
                    </table>
                    <div className='table-container' id='observer-root'>
                        <table className='table'>
                            <tbody id='observe-elements'>
                                {state.items?.map((item, index) => {
                                    return (
                                        <tr key={index} id={`observe-${index}`}>
                                            <td>{item.editTime}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.type}</td>
                                            <td>{item.descripiton}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <button type='button' className='btn btn-primary' onClick={fetchData}>
                        Get more
                    </button>
                </div>
            </div> */}
        </div>
    );
}