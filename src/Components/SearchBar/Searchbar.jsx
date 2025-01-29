import React, { useState } from 'react';

const SearchBar = () => {
    const { query, setQuery, isError } = 
    useGlobalContext();
}

return (
    <>
        <section className="search-section">
            <h2>Search for movie</h2>
            <form action="#" onSubmit={(e) => e.preventDefault}>
                <div>
                    <input type="text" placeholder='Search Movie' value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
            </form>
            <div className="card-error">
                <p>{isError.show && isError.msg}</p>
            </div>
        </section>
    </>
)

export default SearchBar;