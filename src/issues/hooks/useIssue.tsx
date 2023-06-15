import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';

export const getIssueInfo = async (issueNumber : number) :Promise<Issue> =>{
    sleep(2)
    const {data} = await githubApi.get(`/issues/${issueNumber}`);
    console.log(data)
    return data;
}

export const getIssueComments = async (issueNumber : number) :Promise<Issue[]> => {
    sleep(2)
    const {data} = await githubApi.get(`/issues/${issueNumber}/comments`);
    return data;
}

export const useIssue = (issueNumber : number) => {

    const issueQuery = useQuery(
        ['issue',issueNumber],
        ()=>getIssueInfo(issueNumber)
    );

    //este query depende de el otro
    const commentsQuery = useQuery(
        ['issue',issueNumber,'comments'],
        ()=>getIssueComments(issueQuery.data!.number),
        {
            enabled: !!issueQuery.data
        }   
    );

  return {
    issueQuery,
    commentsQuery
  }
}
