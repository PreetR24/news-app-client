import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, date }) => {
    const descriptionStyle = {
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis"
    };

    return (
        <div className="my-4">
            <div className="card">
                <img 
                    src={imageUrl} 
                    className="card-img-top" 
                    alt={title || "News Image"} 
                />
                <div className="card-body">
                    <h5 className="card-title">{title || "No Title Available"}</h5>
                    <p className="card-text" style={descriptionStyle}>
                        {description || "No description available."}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            on {date ? new Date(date).toGMTString() : "Unknown Date"}
                        </small>
                    </p>
                    <a 
                        rel="noopener noreferrer" 
                        href={newsUrl} 
                        target="_blank" 
                        className="btn btn-sm btn-primary"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
