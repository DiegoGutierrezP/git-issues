import axios from "axios";

export const githubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers:{
        Authorization: `Bearer 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`
    }
})

