import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => { 

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(response => {
                    if(!response.ok) {
                        throw Error('could not fetch data for resource');
                    }
                    return response.json()
                  })              
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                }).catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(error.message);
                    }
                    
                })              
        }, 1000);
                        // fetch('http://localhost:8000/blogs')
                        //     .then((res) => {
                        //         return res.json();
                        //     }).then((data) => {
                        //         console.log(data);
                        //         setBlogs(data);
                        //     });
  


            // try {
            //     setTimeout( async () => {
            //         const response = await fetch('http://localhost:8000/blogs');              
            //         const data = await response.json();
            //         setData(data);
            //         setIsPending(false);
            //             // fetch('http://localhost:8000/blogs')
            //             //     .then((res) => {
            //             //         return res.json();
            //             //     }).then((data) => {
            //             //         console.log(data);
            //             //         setData(data);
            //             //     });
            //     }, 1000);
            // } catch (error) {
            //     console.log(error.message);
            // }
        return () => abortCont.abort();
    },[url]);
    return {data, setData, isPending, error};
}

export default useFetch;
