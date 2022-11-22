import { useNavigate } from "react-router-dom";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import remove from '../images/remove.png'

export default function ShowExperts(props){

    const {username,experts} = props

    let navigate = useNavigate()


    const showExperts = experts.map( ({id,username,email,password}) => {

        function handleRemove(){
            console.log("remove "+id)
        }

        return(
            <tr>
                <img src={remove} alt="" onClick={handleRemove}/>
                <td width="400">{username}</td>
                <td width="700">{email}</td>
                <td width="200">{password}</td>
            </tr>
        )

    } )



    function goBack(){
        navigate('/HomeAdmin')
    }


    return(
        <div>
            <NavBarProfile username={username}/>
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                <h1 className = "ftAddSp">Consultar Especialista</h1>
                <div className="tableSpace">
                    <table width="700">
                        <tr>
                            <td>
                                <table width="700">
                                    <tr>
                                        <th width="400">Username</th>
                                        <th width="700">Email</th>
                                        <th width="200">Password</th>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="allowOverflow">
                                    <table width="700" >
                                        {showExperts}
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}


/*
  <tr>
    <td>
       <table cellspacing="0" cellpadding="1" border="1" width="300" >
         <tr style="color:white;background-color:grey">
            <th>Header 1</th>
            <th>Header 2</th>
         </tr>
       </table>
    </td>
  </tr>
  <tr>
    <td>
       <div style="width:320px; height:80px; overflow:auto;">
         <table cellspacing="0" cellpadding="1" border="1" width="300" >
           <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
           <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
         </table>  
       </div>
    </td>
  </tr>
</table>*/