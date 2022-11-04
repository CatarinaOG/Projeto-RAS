import '../styles/Profile.css'

export default function IdSaldo(props){

    const {username,balance} = props


    function getBalance(){
        // get balance from username
        /*
        const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email})
		};
		fetch('', requestOptions)
			.then(response => response.json())
			.then(data => this.setState({ postId: data.id }));
        */
        return 0
    }

    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className='ftusername'>{username}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className='ftval'>Saldo: {balance}$</h3>
            </div>
        </div>
    )
}