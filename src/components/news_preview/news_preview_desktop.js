import InfiniteLoader from 'react-infinite-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
// Importando o React e component
import React, { Component } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';

//declarando css
import './stylesheet/news_preview_desktop.css';

//declarando constants
const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';
const url = 'data:image/jpeg;base64,';



class NewsPreviewDesktop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {        
        this.setState({ isLoading: true });  
        this.loadData();
    }
    loadData = () => {
        fetch(api)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ news: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { news, isLoading, error } = this.state;
        console.log(news);
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
          return <p>Loading ...</p>;
        }
        
        return (
            <div className="news-preview-desktop">
                {
                    news.map((n, i) => {
                      return (
                        <div className="npd-infos" id="npd-infos" key={i}>
                          <Col m={12} s={4}>
                            <div className="npd-img"><img src={url + n.imagem} /></div>
                          </Col>
                          <Col m={12} s={8}>
                            <div className="npd-thumbs">
                              <h3 className="npd-titulo">{n.titulo}</h3>
                              <p className="npd-descricao">{n.descricao}</p>              
                            </div>
                          </Col>                          
                        </div>
                      )
                    })
                }
                <div className="clearfix"></div>
            </div>
        )
    }
}

export default NewsPreviewDesktop;
