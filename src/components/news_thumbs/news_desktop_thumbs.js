// Importando o React
import React, { Component, Fragment } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, CardTitle, Icon } from 'react-materialize';

import './stylesheet/news_thumbs_desktop.css';

const url = 'data:image/jpeg;base64,';
const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';

class NewsDesktopThumbs extends Component {
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
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
          return <p>Loading ...</p>;
        }
         
        return (
            <Fragment> 
                <Row>                    
                    {
                        news.map((n, key) => 
                            <Col key={key} m={6}>
                                <div className="dt-img">
                                    <img src={url + n.imagem}></img>
                                    <div className="dt-title">
                                        <Icon small>favorite</Icon>
                                        <p>{n.num_likes}</p>
                                    </div>
                                </div>
                                <div className="n-infos">
                                    <h3>{n.titulo} </h3>
                                    <p>{n.descricao}</p>
                                    <span className="n-titulo">
                                        <Icon small>public</Icon> 
                                        <p>{n.titulo} </p>
                                    </span>
                                    <span className="n-data">
                                        <Icon small>access_time</Icon> 
                                        <p>{n.data_publicacao}</p>
                                    </span>
                                    <div className="clearfix"></div>
                                </div>                                 
                            </Col>
                        )
                    }     
                    
                </Row>
            </Fragment>
        );
    }
}

export default NewsDesktopThumbs;
    
    

