import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react';


const solanaWeb3 = require('@solana/web3.js');
let rotcoin = 4;





function App() {
 
 
            return (
                <main>
                <Head></Head>
                <Items></Items>
                </main>
                
                
            );
}


function Head(){
  return(
      
      <div className='container'>
     
            <div className='row'>
                <div className='col-6'>logo</div>
                <div className='col-6'>
                    <button onClick={connectWallet}> Conect </button>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                        <h1>ROTTENVILLE STORE</h1>
                </div>
            </div>
     
     
     

     
    

       


       </div>


    
  )
}

function Items(){
    return (
        <div className='container'>
            <div className='row'>
                    <Item></Item>
                   
                    <Itemoff></Itemoff>
                    <Itemoff></Itemoff>
                    <Itemoff></Itemoff>
                  
                    
            </div>
        </div>
    )
}

function Item(){
   
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

        
      

        <div className='col-3 '>
             
         

             <div className='item'>
              <div className='imagencita'>
                 <img width="100%" src="https://www.arweave.net/bYClK7QzKHo307GobPhDt2LH4zwZgZeZ1tBpPOC-nnk?ext=png" alt="" title="" />
              </div>
              <div className='titulo'>
                    <h3>Rifa de cositas cool</h3>
                    <span>Price: ${sumcostorot} Rots/ticket</span>
                    <span>Raffle Ends: 22/05/2022</span>

              </div>
            
            <button onClick={menos}>-</button> <div>{sumadortick}</div> <button onClick={mas}>+</button>

              <button onClick={() => transferencia(4)}> Join Raffle</button>

              </div>



        </div>
    )
}

function Itemoff(){
    return(
        <div className='col-3 '>
             
             <div className='itemoff'>
              <div className='imagencita'>
                 <img width="100%" src="https://www.arweave.net/bYClK7QzKHo307GobPhDt2LH4zwZgZeZ1tBpPOC-nnk?ext=png" alt="" title="" />
              </div>
              <div className='titulo'>
                    <h3>cool stuff next</h3>
                  
                    <span>Price: </span>
                    <span>Raffle Ends: </span>

              </div>
           

              </div>



        </div>
    )
}


const connectWallet = async () => {
  if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
          try {
              const resp = await window.solana.connect();
              resp.publicKey.toString()
              console.log("My public key", resp.publicKey.toString());
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




function transferencia(r){



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
      
            alert("Done! See the console output for how to view the transaction.")
      
            await connection.confirmTransaction(signature).then(data => {
                console.log("Done!", data);
            });
      
        } catch (error) {
      
            alert(String(error['message']));
      
        }
      
      }





}


export default App;
