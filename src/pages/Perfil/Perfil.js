import React, {useState, useEffect} from "react";
import "./Perfil.css"
import { Avatar, IconButton, Link, List, Modal, Typography } from "@material-ui/core";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SettingsIcon from '@material-ui/icons/Settings';
//import Carousel from "react-bootstrap/Carousel"
import {Button, Form} from "react-bootstrap"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../Footer";
//import Swiper from 'react-id-swiper';
import api from "../../Services/api";
import { USER_ID} from '../../Services/auth';
import { useHistory } from "react-router-dom";

function Perfil(){

    const IdUsusario = sessionStorage.getItem(USER_ID);

    let [paintings, setPaintings] = useState([]);


    const nameUser = localStorage.getItem("nameUser");
    const UrlPerfil = localStorage.getItem("UrlPerfil");
    const QuestionUser = localStorage.getItem("QuestionUser");


    const history = useHistory();
    const [open,setOpen]= useState(false);
    

    function handleDrawer(isOpen){
        setOpen(isOpen);
    }

    async function getUsersPaintings(){
        try {
            console.log(`A question do usuario é: ${QuestionUser}`);
            const response = await api.get(`/paintings/${IdUsusario}`);
            console.log(`O url de perfil é: ${UrlPerfil}`);
            setPaintings(response.data);
        } catch (error) {
            console.warn(error);
            alert("Algo deu errado");
        }
    };


    useEffect(() => {
        getUsersPaintings();
    }, []);

    return (
        <div>
        <div className="total_perfil">
        <Modal open={ open } onClose={()=> handleDrawer(false)} className="modal_perf"> 
                <List > 
                    <Form className="form_perf"> 
                    <Form.Group controlId="formBasicEmail"> 
                        <h1>Mudar o Email</h1> 
                        <Form.Label>Email</Form.Label> 
                        <Form.Control type="email" placeholder="Insira o novo email" /> 
                        <Form.Text className="text-muted"> 
                        </Form.Text> 
                    </Form.Group> 
                    <Button variant="primary" type="submit"  className="botoes_modal"> 
                            Enviar 
                    </Button> 
                    <br/>  
                        <h1>Mudar Senha</h1> 
                        <Form.Group controlId="formBasicEmail"> 
                        <Form.Label>Senha antiga</Form.Label> 
                        <Form.Control type="password" placeholder="Insira senha atual" /> 
                        <Form.Text className="text-muted"> 
                        </Form.Text> 
                    </Form.Group> 
                    <Form.Group controlId="formBasicEmail"> 
                        <Form.Label>Nova senha</Form.Label> 
                        <Form.Control type="email" placeholder="Insira a nova senha" /> 
                        <Form.Text className="text-muted"> 
                        </Form.Text> 
                    </Form.Group> 
                    <Button variant="primary" type="submit"  className="botoes_modal"> 
                            Enviar 
                    </Button>
                    </Form>
                </List>
            </Modal>
                <div className="header">
                    <div className="botaoConfigContaPerfil" >
                    <Link
                        component="button"
                        color="white"
                        onClick={()=> handleDrawer(!open)}
                        >
                        Configurações da Conta
                    </Link>
                        <IconButton label="Configurações da conta" aria-label="editar os dados" className="botao" style={{width:"50px", color:"#f8f8f8"}} onClick={()=> handleDrawer(!open)} >
                            <SettingsIcon/>
                        </IconButton>
                    </div>
                    <br/>
                    <div className="botaoAddPainting">
                    <Link
                        component="button"
                        color="white"
                        onClick={() => history.push("add_painting")}
                        >
                        Adicionar Pintura
                    </Link>
                    <AddToPhotosIcon style={{width:"50px", color:"#f8f8f8" }} onClick={() => history.push("add_painting")}>
                        <SettingsIcon/>
                    </AddToPhotosIcon>
                    </div>
                </div>
            <div className="perfil_section">
                <div className="infos_avatar">
                    
                    <div className="container_perfil" >
                        <div className="avatar_nome">
                            <Avatar alt={nameUser} src={UrlPerfil} style={{ height: '200px', width: '200px'}}/>
                            <div className="textosPerfil">
                                <Typography variant="h4" className="nomeUsuario">{nameUser}</Typography>
                                {/* <Typography variant="h5" className="infosPerfilMobile">"{QuestionUser}"</Typography> */}
                                <Typography variant="h5" classname="infosPerfilDesktop">"{QuestionUser}"</Typography>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <Carousel infiniteLoop="true" showThumbs="" width="80%" className="carrossel_perf" showStatus="">
                        
                    {paintings.map((artes) => (
                    <div className="artsMuseu">
                    <img name={artes.name} src={artes.src} alt={artes.alt} className="image_car" />
                    </div>
                        ))}
                </Carousel>
                    <div className="imgDisp">
                    {paintings.map((artes) => (
                        <div className="artsMuseu">
                        <img name={artes.name} src={artes.src} alt={artes.alt} className="image_car" />
                        </div>
                            ))}
                    </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
}

export default Perfil;