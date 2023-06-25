import React, { useState } from 'react';
import styles from './news.module.css';

const News = ({ news }) => {

    const [filteredNews, setFilteredNews] = useState([]);

    const handleClick = (source) => {
        setFilteredNews(news?.filter(newInfo => newInfo.source === source));
    };

    return (
        <>
            <section class={styles.searchButtonsContainer}>
            <button onClick={() => handleClick('elchapuzas')}>ElChapuzasInformatico</button>
                <button>ProfesionalReview</button>
                <button>HardZone</button>
            </section>
            <ul>
                {filteredNews.map(item => (
                <li key={item.href}>
                    <a href={item.href} class={styles.textArticle}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    </a>
                </li>
                ))}
            </ul>
        </>
    );
}

export default News;
