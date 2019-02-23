// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card } from 'react-materialize';

import MediaQuery from "react-responsive";
// Importando o Component Header
import Header from '../header/header'
// Importando componentes de news
import NewsThumbs from '../news_thumbs/news_thumbs';
import NewsDesktopThumbs from '../news_thumbs/news_desktop_thumbs';
import NewsPreview from '../news_preview/news_preview';
import NewsPreviewDesktop from '../news_preview/news_preview_desktop';
// Importando css e scss
import '../news_thumbs/stylesheet/news_thumbs.css';
import '../news_thumbs/stylesheet/news_thumbs_switch.scss';
import '../news_preview/stylesheet/news_preview.css';
import '../news_preview/stylesheet/news_preview_switch.scss';
import './stylesheet/news.css';

const News = () => (
  
    <Row>
        <Col m={8} s={12}>
            <div className="nt-container">
                <Header /> 
                <div className="clearfix"></div>
                <MediaQuery query="(max-device-width: 600px)">
                    <NewsThumbs />
                </MediaQuery>
                <MediaQuery query="(min-device-width: 680px)">
                    <NewsDesktopThumbs />
                </MediaQuery>                                                    
                <div className="clearfix"></div>
            </div>            
        </Col>
        
        <Col m={4} s={12}>
            <MediaQuery query="(max-device-width: 600px)">
                <NewsPreview />
            </MediaQuery>
            <MediaQuery query="(min-device-width: 680px)">
                <NewsPreviewDesktop />
            </MediaQuery>
        </Col>
    </Row>  
);

export default News;