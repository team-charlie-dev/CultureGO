import serverUrl from '../../address'

const fetchData = async () => {
    const response = await fetch(`http://${serverUrl}:4000/getitem?amount=10`);
    const data = await response.json();
    console.log("hej")
}