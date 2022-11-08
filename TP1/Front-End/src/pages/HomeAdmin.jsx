import NavBarProfile from "../components/NavBarProfile"


export default function HomeAdmin(props){

    const {username,setRender} = props

    function goToAddExpert(){
        setRender('AddExpert')
    }

    function logout(){
        setRender('Login')
    }

    return(
        <div>
            <NavBarProfile
                username={username} 
            />
            <div className='whiteShadow'>
                <div className="contentAdmin">
                    <button className="ButtonsAdmin1" onClick={goToAddExpert}>Registar Especialista</button>
                    <button className="ButtonsAdmin2" onClick={logout}>Logout</button>
                </div>
            </div>

        </div>
    )


}