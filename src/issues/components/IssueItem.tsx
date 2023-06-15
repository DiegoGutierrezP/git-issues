import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';
import { timeSince } from '../../helpers';

interface Props {
    issue:Issue
}

export const IssueItem:FC<Props> = ({issue}) => {

    const navigate = useNavigate(); 
    const queryClient = useQueryClient();

    const prefetchData = () => {

        queryClient.prefetchQuery(
            ['issue',issue.number],
            ()=>getIssueInfo(issue.number),
        )

        queryClient.prefetchQuery(
            ['issue',issue.number,'comments'],
            ()=>getIssueComments(issue.number),
        )
    }

    const preSetData = () => {
        //precarga la data en cache, no hace peticion http
        queryClient.setQueryData(
            ['issue',issue.number],
            issue,//se guarda la data
            {
                //indica que hasta que esta fecha no mayor a la actual, no se hara un retech de la data
                //si pasa de esta fecha se hara refetch
                updatedAt: new Date().getTime() + 1000000
            }
        )
    }

    return (
        <div className="card mb-2 issue" 
        onMouseEnter={preSetData}
        onClick={()=>navigate(`/issues/issue/${issue.number}`)} >
            <div className="card-body d-flex align-items-center">
                
                {
                    issue.state === State.Open
                     ?  <FiInfo size={30} color="red" />
                     : <FiInfo size={30} color="green" />
                }
                
                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                        {
                            issue.labels.map(label => (
                                <span
                                    key={label.id}
                                    className='badge rounded-pill m-1'
                                    style={{backgroundColor:`#${label.color}`,color:'black'}}
                                >
                                    {label.name}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
