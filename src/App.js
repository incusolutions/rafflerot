import logo from './logo.svg';
import './App.css';


const solanaWeb3 = require('@solana/web3.js');


function App() {
 

  
 
  return (
    <Head></Head>
  );
}


function Head(){
  return(
      
      <div>
     
      <div>hola emilio</div>
     
       <button onClick={connectWallet}>
          Conect
       </button>

       <button onClick={transferencia}>
          Join Raffle
       </button>

       


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




function transferencia(){

    transfer();
     const transfer = async () => {

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
                    'amount': '1000000000',
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
