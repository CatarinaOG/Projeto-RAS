

export default function TableTransact(props){

    const {data,dark} = props



/**
   * data irá ser pecorrido de forma a construir cada linha da tabela
   */

    return(

        <div className="tableDiv">
            <table width="700">
                <tr>
                    <td>
                        <table width="700">
                            <tr>
                                <th className={`ftth${dark}`} width="400">Data</th>
                                <th className={`ftth${dark}`} width="400">Descrição</th>
                                <th className={`ftth${dark}`} width="200">Operação</th>
                                <th className={`ftth${dark}`} width="200">Saldo Após Transação</th>

                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="allowOverflowTransact">
                            <table width="700" >
                            {data.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={`fttd${dark}`} width="400">{val.date}</td>
                                        <td className={`fttd${dark}`} width="400">{val.description}</td>
                                        <td className={`fttd${dark}`} width="200">{val.operation}</td>
                                        <td className={`fttd${dark}`} width="200">{val.balance}</td>
                                    </tr>
                                )
                            })}
                            </table>
                        </div>
                    </td>
                </tr>
            </table>

        </div> 
    )
}
