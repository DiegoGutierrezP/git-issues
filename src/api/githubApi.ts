import axios from "axios";

export const githubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers:{
        Authorization: `Bearer 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`
    }
})

