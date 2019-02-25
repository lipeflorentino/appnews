//importando components para scroll infinito
import InfiniteLoader from 'react-infinite-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
// Importando o React e component
import React, { Component } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//declarando css
import './stylesheet/news_preview_desktop.css';

//declarando url da api e da imagem
const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';
const url = 'data:image/jpeg;base64,';

//NewsPreviewDesktop
class NewsPreviewDesktop extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            isLoading: false,
            error: null,
        };
    }
    
    //setando estado carregando e chamando function para pegar dados da api
    componentDidMount() {        
        this.setState({ isLoading: true });  
        this.loadData();
    }
    //function para pegar dados da api
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
    
    //function para ordenar dados da api
    ordena(list){
        console.log("ordenando...");
        const news_order = list.sort(function (a, b) {
            return (a.num_likes <= b.num_likes) ? 1 : ((b.num_likes <= a.num_likes) ? -1 : 0);
        });
        return news_order;
    }

    //renderizar
    render() {
        const { news, isLoading, error } = this.state;    
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            //icone de loading...
            return <div className="loader"></div>;
        }
        
        return (
            <div className="news-preview-desktop">
                <a href="https://www.google.com" target="_blank">
                {
                    this.ordena(news).map((n, i) => {
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
                </a>
            </div>
        )
    }
}

export default NewsPreviewDesktop;
