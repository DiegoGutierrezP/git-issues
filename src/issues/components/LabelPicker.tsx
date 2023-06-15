import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Label } from "../interfaces/label";
import { useLabels } from "../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { FC } from 'react';

interface Props {
  selectedLabels : string[];
  onChange: (labelName:string) => void
}

export const LabelPicker:FC<Props> = ({selectedLabels,onChange}) => {

  const labelsQuery = useLabels();

  //isLoading: se ejecuta la primera vez , cuando no tiene data
  //isFetching: se ejecuta por cada peticion
  if(labelsQuery.isLoading) //! porque is Loading y no isFetching
    return (<LoadingIcon/>)

  return (
    <>
    {
      labelsQuery.data?.map(label => (
        <span 
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={() => onChange(label.name)}
        >
            {label.name}
        </span>
      ))
    }
        
    </>
  )
}


