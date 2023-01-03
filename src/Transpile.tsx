import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { transpile, compileSolFiles } from '@nethermindeth/warp';
import { PluginClient } from '@remixproject/plugin'
import { PluginApi } from '@remixproject/plugin-utils'
import { IRemixApi } from '@remixproject/plugin-api'
import axios from "axios";

interface props {
    remixClient: PluginClient<any, Readonly<IRemixApi>> & PluginApi<Readonly<IRemixApi>>
}

const Transpiler = ({ remixClient }: props) => {
    const [currentFileName, setCurrentFileName] = useState('');
    const [noFileSelected, setNoFileSelected] = useState(false);
    const allowedFileExtensions = ['sol'];

    useEffect(() => {
        if (remixClient) {console.log(remixClient)
            setTimeout(() => {
                remixClient.on('fileManager', 'currentFileChanged', (currentFileChanged: any) => {
                    console.log(currentFileChanged)
                    const fileName = currentFileChanged.split('/').pop();
                    const currentFileExtension = fileName.split('.').pop() || '';
                    setNoFileSelected(!allowedFileExtensions.includes(currentFileExtension));
                    setCurrentFileName(fileName);
                    })
                }, 1000);
        }
      }, [remixClient])

    
    return (
        <>
            {
                noFileSelected && currentFileName ? (
                    <Button variant="primary" disabled>Transpile</Button>
                )
                : (
                    <Button variant="primary" onClick={async () => {
                        const currentFile = await remixClient.call('fileManager', 'getCurrentFile');
                        await remixClient.call('fileManager', 'readFile', currentFile).then(async (fileContent: any) => {
                            console.log(fileContent)
                            const transpilationResult = await axios.get('http://localhost:6060/transpile', { 
                                params: {
                                    content: fileContent,
                                    filename: currentFileName
                                }
                             });
                            let transpilationData = transpilationResult.data[0][1]
                            let fileName = currentFileName.split('.').slice(0, -1).join('.') + '.cairo'
                            await remixClient.call('fileManager', 'writeFile', `warp/${fileName}`, transpilationData)
                            await remixClient.call('fileManager', 'open', `warp/${fileName}`)
                        })
                    }}>Transpile</Button>
                )
            }
        </>
    )
}

export default Transpiler