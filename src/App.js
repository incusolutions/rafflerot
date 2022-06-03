import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react';
import axios from 'axios';


import logorotten from './imagen/logo.png' ;// relative path to image 

import raffle from './imagen/raffle1.png' ;// relative path to image 
import sta from './imagen/standar.png' ;// relative path to image 


const solanaWeb3 = require('@solana/web3.js');
let rotcoin = 4;

let bille;







function App() {
            
            const [botlabelwall, Setbotlabelwall] = useState('Wallet');

            const [showmensaje, Setbshowmensaje] = useState('nomostrar');

            const [mensaje, Setmensaje] = useState('');

           // conectarbilletera();

          
            return (
                <main>
                <Head></Head>
                <Items></Items>
                </main>
                
            );



            function Head(){
              return(
                  
                  <div className='container'>
                 
                        <div className='btwallet'>
                                <button className='botoneswall' onClick={conectarbilletera}> {botlabelwall} </button>
                        </div>    
                        <div className='row'>
                            <div className='col-12'>
                                <div className='wraperlogo'> <img src={logorotten} alt="front" /> </div>
                            </div>
                        </div>
            
                       
                        <div className={'dialog '+showmensaje}>{mensaje}</div>
 
              
            
                   </div>
                   
                
              )
            }
            
            function Items(){
                return (
                    <div className='container bloquecentral'>
                        <div className='row'>
                                <Item></Item>
                               
                                <Itemoff></Itemoff>
                                <Itemoff></Itemoff>
                              
                                
                        </div>
                    </div>
                )
            }
            
            function Item(){
               
              
               let tipo = 'raffle'; 
               let ti='Rottenville alpha #329 and Gold Bust Sculpture';

               let costorot = 4;
               const [sumadortick, Setsumadortick] = useState(1);
               const [sumcostorot, Setsumcostorot] = useState(costorot);
               
               function menos(){
                
                Setsumadortick(sumadortick-1);
                Setsumcostorot((sumadortick-1)*costorot);
                
               }
            
               function mas(){
              
                Setsumadortick(sumadortick+1);
                
                setTimeout(function() {console.log(sumadortick);}, 5000)
            
            
                Setsumcostorot((sumadortick+1)*costorot);
                
               }
            
            
                return(
            
                
                    <div className='col-12 col-md-12 col-lg-6 '>
                    
                         <div className='item'>
                              <span className='rafle'>Raffle</span>
                              <div className='imagencita'>
                                <img width="100%" src={raffle} alt="" title="" />
                              </div>
                              <div className='titulo'>
                                    <span className='titrifa'>{ti}</span>
                                    <span>Price: $ <span className='valor'>{sumcostorot}</span> Rots/ticket</span>
                                    <span>End: JUN 10 /13:00 utc</span>

                                    <span className='win'>One winner</span>

                                  
            
                              </div>
                        
                               <div className='row centraritems'> <button className='menos' onClick={menos}>-</button>  <button className='mas' onClick={mas}>+</button> </div>
            
                               <div className='row centraritems'>  <button className='buyticket' onClick={() => transferencia(sumcostorot,tipo,ti,bille)}> Buy {sumadortick} Ticket</button> </div>
            
                         </div>
            
                    </div>
                )
            }
            
            function Itemoff(){
                return(
                  <div className='col-12 col-md-12 col-lg-3 '>
                    
                          <div className='item'>
                             
                              <div className='imagencita'>
                                <img width="100%" src={sta} alt="" title="" />
                              </div>
                              <div className='titulo'>
                                    <span className='titrifa'>Upcomming</span>
                             
                              </div>

                              <div className='row centraritems'>  <div className='buyticketoff'> Upcomming</div> </div>

                        
                              
                          </div>
     
                  </div>
                )
            }
             
            function no(){
              Setbshowmensaje('nomostrar');
             }
            
            function transferencia(r,t,ti,bi){
            
            
                let total = r+'000000000';
            
                transfer();
           
           
                async function transfer(){
                   
                    const resp = await window.solana.connect();
                  
                    fetch(process.env.REACT_APP_APITRANSFER, {
                  
                        method: "POST",
                        
                        // Do NOT put your keys in a *public* HTML file. This is ONLY for testing purposes.
                        headers: {
                            'Content-Type': 'application/json',
                            'APIKeyId': process.env.REACT_APP_BLOCKAPI, // INSERT-API-KEY-ID
                            'APISecretKey': process.env.REACT_APP_BLOCKAPISECRECT // INSERT-API-SECRET-KEY
                        },
                  
                        body: JSON.stringify({
                                'sender_public_key': resp.publicKey.toString(),
                                'recipient_address': process.env.REACT_APP_BILLETERA,
                                'return_compiled_transaction': true,
                                'amount': total.toString(),
                                'token_address':'RotMAyKDv5g1UMaUzJjBriSBqzVb3eQHopc6DjW7XTp',
                                'network': 'devnet',
                                //'network': 'mainnet-beta'
                            }
                        )
                  
                    }).then(res => {
                  
                        res.json().then(data => {
                  
                            console.log("Blockchain API request complete! response:", data, res);
                  
                            if (data['b58_compiled_transaction'] === undefined) {
                  
                                if (data['error_message'] === undefined) {
                  
                                    alert("Unknown error");
                  
                                } else {
                  
                                    alert("Blockchain API Error: " + String(data['error_message']))
                  
                                }
                  
                            } else {
                  
                                const transactionData = data['b58_compiled_transaction'];
                                console.log("Unsigned transaction: ", transactionData);

                               
                                Setbshowmensaje('mostrar');
                                Setmensaje('Sending Transaction');
                  
                                sendRequest(transactionData);
                  
                            }
                  
                        });
                  
                  
                    });
                  
                }
                  
                const sendRequest = async (transactionData) => {
                  
                    //const network = "https://api.mainnet-beta.solana.com/";
                    const network = "https://explorer-api.devnet.solana.com/";
                    
                  
                    const connection = new solanaWeb3.Connection(network);
                  
                    try {
                  
                        const { signature } = await window.solana.request({
                  
                            method: "signAndSendTransaction",
                            params: {
                                 message: transactionData,
                            },
                  
                        })
                  
                        console.log("Signature! signature", signature);
                  
                        console.log("Done! You can view the transaction at https://explorer.solana.com/tx/" + signature + ". If you are using devnet, add `?cluster=devnet` to the end of the url.")
                  
                       // alert("Done! See the console output for how to view the transaction.")

                        // setTimeout(no, 3000);
                        Setbshowmensaje('mostrar');
                        Setmensaje("Done! Transaction.");
                        setTimeout(enviardatos(t,ti,bi), 4000);
                       
                        
                        await connection.confirmTransaction(signature).then(data => {
                            console.log("Done!", data);
                        });
                  
                    } catch (error) {
                  
                       // alert(String(error['message']));
                        Setmensaje(String(error['message']));
                      
                        setTimeout(no, 3000);

                
                  
                    }
                  
                }
            
            
            
            }


            function conectarbilletera(){
              
            
              const connectWallet = async () => {
             
              
                if ("solana" in window) {
                    const provider = window.solana;
                    if (provider.isPhantom) {
                        try {
                            const resp = await window.solana.connect();
                            resp.publicKey.toString()
                            localStorage.setItem('billelocal', resp.publicKey.toString());
                            bille = resp.publicKey.toString();
                            console.log("My public key", bille);
              
                             Setbotlabelwall('Connected');
                            // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
                        } catch (err) {
                            // { code: 4001, message: 'User rejected the request.' }
                        }
                        const isPhantomInstalled = window.solana && window.solana.isPhantom;
              
                        console.log("isPhantomInstalled?", isPhantomInstalled);
                        return provider;
                    }
                }
                // window.open("https://phantom.app/", "_blank");
              };

              connectWallet();


            }


            function enviardatos(t,titu,w){

            
              if(typeof w === 'undefined'){
              
                conectarbilletera();

                setTimeout(trysend, 2000);

              } 

              function trysend(){

                     let b =  localStorage.getItem('billelocal');
                      axios.post(process.env.REACT_APP_API_PATH,{
                          "tipo":t, 
                          "tituloitem":titu, 
                          "billetera":b, 
                          "web":process.env.REACT_APP_CLAVEWEB
                  
                      }, {
                        headers: {
                          "Content-Type": "application/json"
                        }
                      })
                      .then(function (response) {
                        //console.log(response);
                      // Setbshowmensaje('mostrar');
                        Setmensaje('Saved data, Done!');
                        setTimeout(no, 3000);
                      
                      })
                      .catch(function (error) {
                        console.log(error.response);
                        console.log(process.env.REACT_APP_API_PATH);
                      
                    //   Setbshowmensaje('mostrar');
                        Setmensaje('Error Saving data!');
                        setTimeout(no, 3000);
                      });
                    }
              }
          
          
            
    

}





export default App;
