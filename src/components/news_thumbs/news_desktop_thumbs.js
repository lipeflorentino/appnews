// Importando o React
import React, { Component, Fragment } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, CardTitle, Icon } from 'react-materialize';

//importando funcao para computar like
import { addALike } from './javascript/add_a_like.js';

//importando css
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
            message: '',
        };
        this.handleClick = this.handleClick.bind(this);
        
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
        
        const addListeners = this.state.news.map((n) =>
          document.getElementById("thumbsId"+n.id).addEventListener('click', this.handleClick(n.id)),
        ); 
        
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
                                        <div id={'thumbs-id'+n.id}></div>
                                        <Icon small>favorite</Icon>
                                        <p id="p-likes">{n.num_likes}</p>
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
    
    
     handleClick(userId) {    
        addALike(userId);                        
      }
    
}

export default NewsDesktopThumbs;
    
    

