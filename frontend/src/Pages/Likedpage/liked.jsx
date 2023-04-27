import Sort from "../../Components/icons/Sort.jsx";
import Trash from "../../Components/icons/Trash.jsx";

import LogoText from "../../Components/icons/LogoText";

import LikedCard from "./LikedCard";

import {useState, useEffect, useCallback} from 'react'

import {deleteContext} from './DeleteContext'

import FullCard from "../../Components/FullCard/FullCard.jsx";

const Liked = () => {

    var [list, setList] = useState([])
    var [remove, setRemove] = useState([])
    var [map, setMap] = useState(new Map())
    var [del, setDel] = useState(false)
    var [sortNew, setSort] = useState(true)
    var [cntr, setCntr] = useState(0)

    /* state for info/full card */
    const [infoCard, setInfoCard] = useState(
        {
            show: false, 
            id: 'null',
            name: 'null',
            nmbrOfPics: 1
        }
    );

    const fn = (a, value) => {

        if (value)
        {
            setRemove(r => {
                if (r.indexOf(a) === -1)
                    r.push(a)

                return r
            })
        }
        else
        {
            setRemove(r => {
                if (r.indexOf(a) !== -1)
                    r.splice(r.indexOf(a), 1)

                return r
            })
        }
    }

    console.log(map)

    const getLikes = useCallback(() => {

        let ignore = false

        const getData = async () => {
            let data = await fetch(`http://localhost:4000/likes?page=0&sort=${sortNew?"new":"old"}`)
                .then(res => {
                    let json = res.json();
                    console.log(json)
                    return json
                })
                .then(json => {
                    console.log(json)
                    return json
                })
            
            if (ignore)
                return;

            for (let sight of data)
            {
                console.log(sight)

                let card = <div 
                className=" cursor-pointer" 
                onClick={() => setInfoCard(
                    {
                        show: true, 
                        id: sight.sights.sight_id,
                        name: sight.sights.name,
                        nmbrOfPics: 1
                    })}>
                    <LikedCard key={sight.sights.sight_id} name={sight.sights.name} location='Stockholm' callbackFunc={(value) => {fn(sight.sights.sight_id, value)}}
                    img={`https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/sights/${sight.sights.sight_id}/1.jpg`}/>
                </div>
                                

                setList(ls => {
                    ls = ls.slice()
                    ls.push(card)
                    return ls
                })

                setMap(rm => {
                    rm.set(sight.sights.sight_id, card)
                    return rm
                })
            }
        }

        getData()

        // destructor function
        return () => ignore = true
    }, [sortNew])

    useEffect(getLikes, [cntr, getLikes])

    const clickHandlerTrash = () => {
        setDel(del => !del);
    }

    const performRemove = () => {
        list = list.slice()

        for (let id of remove)
        {
            list.splice(list.indexOf(map.get(id)), 1)
            map.delete(id)
        }

        fetch(`http://localhost:4000/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(remove)
        })

        setList(list);
        setRemove([]);
        setMap(map);
        setDel(false);
    }

    const clickHandlerSort = () => {
        setSort( !sortNew )
        clearSights()
        setCntr(cntr+1)
        setDel(false)
    }

    const clearSights = () => {
        setList([]);
    }

    return (
        <div className=" w-full h-screen bg-white overflow-hidden">

            <div className=" w-screen h-20">
                {/* top of screen w/ logo */}
                <div className="p-4">
                    <LogoText/>
                </div>
            </div>

            {   
                /* if show true show card else nothing */
                infoCard.show === true ?
                /* full info card */
                <div className=" w-full h-full bg-opacity-0 ">
                    <FullCard infoState={[infoCard, setInfoCard]} />
                </div> : ""
            }

            <div className="w-full pl-3 pr-3 relative flex justify-normal h-12">
                {/* options bar */}
                <p className="pt-3 text-xl text p-2 flex-grow">Your liked items: </p>
                <button onClick={clickHandlerTrash}>
                    <Trash />
                </button>
                <button onClick={clickHandlerSort}>
                    <Sort />
                </button>
            </div>

            <div className=" w-full p-5 pr-8 pl-8 overflow-scroll h-[calc(100vh-var(--navbar-height)-8rem)] overflow-x-hidden">
                {/* container for list */}
                <deleteContext.Provider value={del}>
                {
                    list
                }
                </deleteContext.Provider>
            </div>

            <div className="absolute w-full bottom-0 flex justify-around">
                <button onClick={performRemove} className="bg-red p-2 rounded-md" 
                    style={{transform: `translate(0, ${del ? -5 : 0}rem)`, transition: "transform 300ms ease-in-out"}}>
                    REMOVE
                </button>
            </div>
            
        </div>
    )
}

export default Liked

