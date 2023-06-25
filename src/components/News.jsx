import React, { useState, useEffect} from 'react';
import axios from 'axios';
import styles from './news.module.css';

const News = () => {
    const [source, setSource] = useState('elchapuzas');
    const [news, setNews] = useState([]);

    const sources = [
        { value: 'elchapuzas', label: 'ElChapuzasInformatico' },
        { value: 'profesionalreview', label: 'ProfesionalReview' },
        { value: 'hardzone', label: 'HardZone' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/scrape?source=${source}`);
                setNews(response.data);
            } catch (error) {
                console.error("Error al recuperar las noticias: ", error);
            }
        }
        fetchData();
    }, [source]);

    const handleSourceChange = async (e) => {
        const newSource = e.target.value;
        setSource(newSource);
      };

    return (
        <>
            <select value={source} onChange={handleSourceChange} className={styles.searchButtonsContainer}>
                {sources.map(source => (
                    <option key={source.value} value={source.value}>{source.label}</option>
                ))}
            </select>
            <ul>
                {news?.map(item => (
                <li key={item.href}>
                    <a href={item.href} className={styles.textArticle}>
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
