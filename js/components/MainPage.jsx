// js/components/MainPage.jsx
// js/components/MainPage.jsx
import {useEffect, useState} from "react";

export default function MainPage() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        try{
            fetch('/api/records', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setRecords(json.data));
        }
        catch (error) {
            console.log(error);
        }
    }, []);
    const deleteRecord = (event) => {
        event.preventDefault();
        const id = event.target.id;
        try {
            fetch(`/api/records?id=${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(json => {
                    setRecords(records.filter(record => record._id !== id));
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <section className={"bg-white"}>
            <div className={"container px-6 py-10 mx-auto"}>
                <h1 className="w-[500px] mx-auto text-center text-5xl font-bold text-blue-400/75 underline">Travel Bucket List app</h1>
                <p className="w-[1000px] mx-auto text-center mt-3 text-1xl italic text-gray-700 dark:text-gray-400">This app presents ideas of places to visit from all over the world</p>


              <div  className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                {
                    records.map(record => (
                        <div key={record.id}
                             className="block max-w-sm p-5 bg-blue-400/50 border border-gray-200 rounded-md shadow shadow-indigo-500/50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{record.titlu}
                            </h3>
                            <p className="font-normal text-gray-700 italic dark:text-gray-400">{record.descriere}
                            </p>
                            <p className="font-bold text-gray-700 dark:text-gray-400">{record.cost}
                            </p>
                            <div className={"flex justify-center mt-4"}>
                                <button type="button"
                                        id={record._id}
                                        onClick={deleteRecord}
                                        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete
                                </button>
                            </div>
                        </div>

                    ))
                }
              </div>
            </div>

        </section>
    )
}