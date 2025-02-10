import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const News = ({ newsKey, pageSize, country, category = 'general' }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const fetchNews = useCallback(async () => {
        const BASE_URL = "https://news-app-server-pink.vercel.app/";
        setLoading(true);
        try {
            const { data } = await axios.get(BASE_URL, {
                params: { country, category, page, pageSize }
            });
            setArticles(prev => page === 1 ? data.articles : [...prev, ...data.articles]);
            setTotalResults(data.totalResults);
        } catch (error) {
            console.error('Error fetching data from server:', error);
        }
        setLoading(false);
    }, [country, category, pageSize, page]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsPulse`;
        setArticles([]);
        setPage(1);
    }, [category, country]);

    const fetchMoreData = () => setPage(prevPage => prevPage + 1);

    return (
        <>
            <h1 className="text-center" style={{ margin: '70px 0px 0px 0px' }}>
                NewsPulse - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title || ''}
                                    description={element.description || ''}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
};

export default News;