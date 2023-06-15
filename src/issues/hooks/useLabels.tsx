import { useQuery } from "@tanstack/react-query";
import { Label } from "../interfaces/label";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

const getLabels =  async ():Promise<Label[]> => { //regresa una promesa que suelve un arreglo de labels
    
    await sleep(2);

    const { data } = await githubApi.get<Label[]>(`/labels?per_page=100`);
    console.log(data)
    return data;
  }

export const useLabels = () => {
    
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            //staleTime:1000 * 60 * 60,//la data se va mantener fresca por una hora(no se disparara nuevo fetching despues de la hora)
            //refetchOnWindowFocus:false,//para que no se haga la peticion cada vez que la ventana tenga el foco nuevamente
            //placeholderData:[]
            placeholderData: [ //mientras se hace la peticion muestra esta data
                {
                    id: 791921801,
                    node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
                    url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
                    name: "❤️",
                    color: "ffffff",
                    default: false,
                },
                {
                    id: 1649755876,
                    node_id: "MDU6TGFiZWwxNjQ5NzU1ODc2",
                    url: "https://api.github.com/repos/facebook/react/labels/Component:%20Fast%20Refresh",
                    name: "Component: Fast Refresh",
                    color: "473bcc",
                    default: false  ,
                }
            ]
        }
      )

    return labelsQuery
    
}
