import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = () => {
    const { country, category, searchUsing } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false); // Prevent re-triggering spinner
    const [initialLoading, setInitialLoading] = useState(true); // Show spinner only on first fetch
    const [nextPage, setNextPage] = useState(null);
    const [nonews, setNonews] = useState(false);

    const fetchNews = async (useNextPage = false) => {
        try {
            if (useNextPage) setLoading(true);
            else setInitialLoading(true);

            const params = {};
            if (useNextPage && nextPage) {
                params.nextPage = nextPage;
            }

            const base_url = process.env.REACT_APP_NEWS_BASE_URL;
            let apiUrl = `${base_url}`;
            if (country) apiUrl = `${base_url}/${country}`;
            if (country && category !== undefined) apiUrl = `${base_url}/${country}/${category}`;
            if (searchUsing) apiUrl = `${base_url}/search/${searchUsing}`;

            const response = await axios.get(apiUrl, { params });

            if (!response.data.results || response.data.results.length === 0) {
                setNonews(true);
                return;
            }

            setArticles(prev => useNextPage ? [...prev, ...response.data.results] : response.data.results);
            setNextPage(response.data.nextPage || null);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            if (useNextPage) setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        
        setArticles([]);
        setNextPage(null);
        setNonews(false);
        fetchNews(false);

        return () => {
            abortController.abort(); // Clean up and abort any ongoing request if the component unmounts
        };
    }, [country, category, searchUsing]);

    return (
        <div className="container">
            <h2 className="my-4 text-center">Showing News</h2>

            {initialLoading && <Spinner />} {/* Show spinner only during the first fetch */}

            <InfiniteScroll
                dataLength={articles.length}
                next={() => fetchNews(true)}
                hasMore={!!nextPage}
                loader={loading && <Spinner />}  // Only show spinner when fetching more
                endMessage={nonews ? <p style={{ textAlign: "center", marginTop: "20px" }}>No new news</p> : null}
            >
                <div className="row">
                    {articles.map((article, index) => (
                        <div key={index} className="col-md-4">
                            <NewsItem
                                title={article.title}
                                description={article.description}
                                imageUrl={article.image_url || "https://via.placeholder.com/150"}
                                newsUrl={article.link}
                                date={article.pubDate}
                            />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default News;
