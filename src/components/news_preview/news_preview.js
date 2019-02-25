import InfiniteLoader from 'react-infinite-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
// Importando o React e component
import React, { Component } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';

const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';
const url = 'data:image/jpeg;base64,';


class NewsPreview extends Component {
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
    
    ordena(list){
        console.log("ordenando...");
        const news_order = list.sort(function (a, b) {
            return (a.data_publicacao <= b.data_publicacao) ? 1 : ((b.data_publicacao <= a.data_publicacao) ? -1 : 0);
        });
        return news_order;
    }

    render() {
        const { news, isLoading, error } = this.state;
        console.log(news);
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
          return <div className="loader"></div>;
        }
        
        return (
          <div className="news-preview">
            <InfiniteScroll
                dataLength={this.state.news.length} 
                next={this.loadData}
                hasMore={true}
                loader={<div className="loader"></div>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                      <b>Yay! You have seen it all</b>
                    </p>
                }>              
                {
                    this.ordena(news).map((n, i) => {
                      return (
                        <div className="np-infos" id="infos" key={i}>
                          <Col m={12} s={8}>
                              <h3 className="np-titulo">{n.titulo}</h3>
                              <p className="np-descricao">{n.descricao}</p>
                              <p className="np-data">{n.data_publicacao}</p>
                          </Col>
                          <Col m={12} s={4}>
                            <div className="np-img"><img src={url + n.imagem} /></div>
                          </Col>
                        </div>
                      )
                    })
                }
            </InfiniteScroll>          
          </div>
        )
    }
}

export default NewsPreview;
