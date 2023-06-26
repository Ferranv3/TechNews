import { useState, useEffect} from 'react';
import axios from 'axios';
import styles from './news.module.css';

const uriAPI = 'https://technews-api-ferran.vercel.app/api/';
//const uriAPI = 'http://localhost:8080/api/';

const News = () => {
    const [source, setSource] = useState('elchapuzas');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const sources = [
        { value: 'elchapuzas', label: 'ElChapuzasInformatico' },
        { value: 'profesionalreview', label: 'ProfesionalReview' },
        { value: 'hardzone', label: 'HardZone' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(uriAPI + source);
                setNews(response.data);
            } catch (error) {
                console.error("Error al recuperar las noticias: ", error);
                setNews([]);
            }
            setLoading(false);
        }
        fetchData();
    }, [source]);

    const handleSourceChange = async (e) => {
        const newSource = e.target.value;
        setSource(newSource);
      };

    return (
        <>
            <div className={styles.searchButtonsContainer}>
                <select value={source} onChange={handleSourceChange} className={styles.searchButtons}>
                    {sources.map(source => (
                        <option key={source.value} value={source.value}>{source.label}</option>
                    ))}
                </select>
            </div>
            
            {loading && 
                <div class={styles.spinner}>
                    <div class={styles.rect1}></div>
                    <div class={styles.rect2}></div>
                    <div class={styles.rect3}></div>
                    <div class={styles.rect4}></div>
                    <div class={styles.rect5}></div>
                </div>
            }
            
            {!loading &&
                <div className={styles.articleGrid}>
                    {news?.map(item => (
                        <div key={item.href} className={styles.article}>
                            <a href={`/article?id=${item.href}`} className={styles.textArticle}>
                                <h2 className={styles.articleTitle}>{item.title}</h2>
                                <p>{item.description}</p>
                            </a>
                        </div>
                        
                    ))}
                </div>
            }
        </>
    );
}

export default News;
