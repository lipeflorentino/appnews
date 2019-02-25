// Importando o React
import React, { Component, Fragment } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, CardTitle, Icon } from 'react-materialize';

//importando funcao para computar like
import { addALike } from './javascript/add_a_like.js';

//importando css
import './stylesheet/news_thumbs_desktop.css';

//declarando url da api e da imagem
const url = 'data:image/jpeg;base64,';
const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';

//NewsDesktopThumbs
class NewsDesktopThumbs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            news: [],
            isLoading: false,
            error: null,               
        };
        this.handleClick = this.handleClick.bind(this);
        
    }   
    
    //setando estado carregando e chamando function para pegar dados da api
    componentDidMount() {        
        this.setState({ isLoading: true });
        this.loadData();     
        this.addListeners();                    
    }   
    
    //function para adicionar listeners nos icones de like 
    addListeners = () => {
        console.log("addListeners!!!");
        this.state.news.map((n) =>
            document.getElementById("thumbs-id"+n.id).addEventListener('click', console.log("chamou addlistener!")),
        ); 
    }
    
    //function para pegar dados da api
    loadData = () => {
        console.log("Loading Data...");
        fetch(api)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ news: data, isLoading: false, }))
          .catch(error => this.setState({ error, isLoading: false }));                  
    }
    
    //function para ordenar dados da api
    ordena(list){
        console.log("ordenando...");
        const news_order = list.sort(function (a, b) {
            return (a.data_publicacao <= b.data_publicacao) ? 1 : ((b.data_publicacao <= a.data_publicacao) ? -1 : 0);
        });
        return news_order;
    }
    
    //function para chamar a funcao de add likes
    handleClick(userId){    
        console.log('handleClick activated!!!');
        addALike(userId);                        
    }
    
    //renderizar
    render() {
        
        const { news, isLoading, error } = this.state;
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
          return <div className="loader"></div>;
        }
         
        return (
            <Fragment> 
                <Row>                    
                    {
                        this.ordena(news).map((n, key) =>                             
                            <Col key={key} m={6}>
                                <div className="dt-img">
                                    <img src={url + n.imagem}></img>
                                    <div className="dt-title">
                                        <div id={'thumbs-id'+n.id} className="tb-click" ></div>
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
    
}

export default NewsDesktopThumbs;
    
    

