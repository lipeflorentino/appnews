// Importando o React
import React, { Component, Fragment } from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, CardTitle, Icon } from 'react-materialize';
//important component de carousel e dots
import Carousel from 're-carousel';
import IndicatorDots from './javascript/indicator-dots.js';
//importando funcao para computar like
import { addALike } from './javascript/add_a_like.js';

//declarando url da api e da imagem
const url = 'data:image/jpeg;base64,';
const api = 'https://wlzdm90cda.execute-api.us-east-1.amazonaws.com/v1/news';

//NewsThumbs(mobile)
class NewsThumbs extends Component {
    //constructor
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
            return (a.data_publicacao <= b.data_publicacao) ? 1 : ((b.data_publicacao <= a.data_publicacao) ? -1 : 0);
        });
        return news_order;
    }
    
    //function para chamar a funcao de add likes       
    handleClick(param, e) {
        console.log('Parameter', param);
        console.log('Event', e);
        addALike(param);        
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
                <Carousel loop className="mycarousel" widgets={[IndicatorDots]}>
                    {
                        news.map((n, key) =>                        
                            <Card key={key} className='small' 
                                header={
                                    <CardTitle image={url + n.imagem}>
                                        <div onClick={this.handleClick.bind(this, n.id)}  className="tb-click">
                                            <Icon small>favorite</Icon>
                                        </div>
                                        <p id={'thumbs-id'+n.id} >{n.num_likes}</p>
                                    </CardTitle>
                                        }>
                                <p>{n.descricao}</p>
                                <div className="n-infos">
                                    <span className="n-titulo">                                 
                                        <Icon small>public</Icon> 
                                        <p>{n.titulo} </p>
                                    </span>
                                    <span className="n-data">
                                        <Icon small>access_time</Icon> 
                                        <p>{n.data_publicacao}</p>
                                    </span>
                                </div>
                            </Card>                      
                        )
                    }   
                </Carousel>
            </Fragment>
        );
    }
     
}

export default NewsThumbs;
    
    

