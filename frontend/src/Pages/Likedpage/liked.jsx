import Sort from "../../Components/icons/Sort.jsx";
import Trash from "../../Components/icons/Trash.jsx";

import LogoText from "../../Components/icons/LogoText";

import LikedCard from "./LikedCard";

import { useState, useEffect, useCallback, useRef } from "react";

import { deleteContext } from "./DeleteContext";

import FullCard from "../../Components/FullCard/FullCard.jsx";

import serverUrl from "../../address";

const Liked = ({ setIsLoggedin, setIsLoading }) => {
  const imgPlaceholder =
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";

  var [list, setList] = useState([]);
  var [remove, setRemove] = useState([]);
  var [map, setMap] = useState(new Map());
  var [del, setDel] = useState(false);
  var [sortNew, setSort] = useState(true);
  var [cntr, setCntr] = useState(0);
  var [contentPage, setContentPage] = useState(0);

  var scrollRef = useRef();
  const delRef = useRef();

  delRef.current = del;

  /* state for info/full card */
  const [infoCard, setInfoCard] = useState({
    show: false,
    id: "null",
    name: "null",
    location: "null",
    nmbrOfPics: 1,
  });

  const handleInfoCard = (sight) => {
    // console.log(delRef.current)
    if (delRef.current === false) {
      setInfoCard({
        show: true,
        id: sight.sights.sight_id,
        name: sight.sights.name,
        location: sight.sights.addresses.location,
        nmbrOfPics: sight.sights.number_of_img === 0 ? 0 : 1,
      });
    } else {
      setInfoCard({
        show: false,
        id: "null",
        name: "null",
        location: "",
        nmbrOfPics: 1,
      });
    }
  };

  const fn = (a, value) => {
    if (value) {
      setRemove((r) => {
        if (r.indexOf(a) === -1) r.push(a);

        return r;
      });
    } else {
      setRemove((r) => {
        if (r.indexOf(a) !== -1) r.splice(r.indexOf(a), 1);

        return r;
      });
    }
  };

  const getLikes = useCallback(() => {
    let ignore = false;

    const getData = async () => {
      setIsLoading(true);
      let data = await fetch(
        `${serverUrl}/likes?page=${contentPage}&sort=${
          sortNew ? "new" : "old"
        }&userId=${localStorage.getItem("user_id")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          if (res.status === 403) {
            setIsLoggedin(false);
          }
          let json = res.json();
          return json;
        })
        .then((json) => {
          return json;
        });

      if (ignore) {
        return;
      }
      for (let sight of data) {
        let card = (
          <div
            className=" cursor-pointer"
            onClick={() => handleInfoCard(sight)}
            key={sight.sights.sight_id}
          >
            <LikedCard
              key={sight.sights.sight_id}
              name={sight.sights.name}
              location={sight.sights.addresses.location}
              callbackFunc={(value) => {
                fn(sight.sights.sight_id, value);
              }}
              img={
                sight.sights.number_of_img === 0
                  ? imgPlaceholder
                  : `https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/sights/${sight.sights.sight_id}/1.jpg`
              }
            />
          </div>
        );

        setList((ls) => {
          ls = ls.slice();
          ls.push(card);
          return ls;
        });

        setMap((rm) => {
          rm.set(sight.sights.sight_id, card);
          return rm;
        });
      }
      setIsLoading(false);
    };

    getData();

    // destructor function
    return () => (ignore = true);
  }, [sortNew, contentPage]);

  useEffect(getLikes, [cntr, getLikes]);

  const clickHandlerTrash = () => {
    setDel((del) => !del);
  };

  const performRemove = () => {
    list = list.slice();

    for (let id of remove) {
      list.splice(list.indexOf(map.get(id)), 1);
      map.delete(id);
    }

    const response = fetch(
      `${serverUrl}/likes?userId=${localStorage.getItem("user_id")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(remove),
      }
    );
    if (response.status === 403) {
      setIsLoggedin(false);
    }

    setList(list);
    setRemove([]);
    setMap(map);
    setDel(false);
  };

  const clickHandlerSort = () => {
    setSort(!sortNew);
    clearSights();
    setCntr(cntr + 1);
    setDel(false);
    setContentPage(0);
  };

  var ignoreScrollFetch;

  const scrollUpdater = useCallback(() => {
    if (
      scrollRef.current.scrollHeight -
        scrollRef.current.scrollTop -
        scrollRef.current.clientHeight <
        400 &&
      scrollRef.current.scrollHeight > 800
    ) {
      if (!ignoreScrollFetch) {
        setContentPage((cp) => cp + 1);
        ignoreScrollFetch = true;
      }
    } else ignoreScrollFetch = false;
  }, []);

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", scrollUpdater);
  }, [scrollUpdater]);

  const clearSights = () => {
    setList([]);
  };

  return (
    <div className=" w-full h-full bg-white overflow-hidden">
      <div className=" w-screen h-20">
        {/* top of screen w/ logo */}
        <div className="p-4">
          <LogoText />
        </div>
      </div>

      <div className="w-full pl-3 pr-3 relative flex justify-normal h-12">
        {/* options bar */}
        <p className="pt-3 text-xl text p-2 flex-grow">
          {" "}
          Mina gillade platser:{" "}
        </p>
        <button onClick={clickHandlerTrash}>
          <Trash />
        </button>
        <button onClick={clickHandlerSort}>
          <Sort />
        </button>
      </div>

      <div
        className=" w-full p-5 pr-8 pl-8 overflow-scroll h-[calc(100%-var(--navbar-height)-8rem)] overflow-x-hidden"
        ref={scrollRef}
      >
        {/* container for list */}
        <deleteContext.Provider value={del}>{list}</deleteContext.Provider>
      </div>

      <div className="absolute w-full bottom-0 flex justify-around">
        <button
          onClick={performRemove}
          className="bg-secondaryDark p-2 rounded-md text-white"
          style={{
            transform: `translate(0, ${del ? -5 : 0}rem)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          Ta bort
        </button>
      </div>
      
      
        {   
      /* if show true show card else nothing */
      infoCard.show === true ?
      /* full info card */
      <div className="absolute h-full w-full pt-20 top-0 left-0">
          <FullCard infoState={[infoCard, setInfoCard]} setIsLoading={setIsLoading} />
      </div> : ""
  }
      
    </div>
  );
};

export default Liked;
