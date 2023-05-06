import React from 'react'
import { API_URLS } from '../Services/ApiUrls'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Grid, styled } from '@mui/material'
import { ArticleSmallView } from './articleSmallView'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const StyledBox = styled(Box)({
    color: '#878787',
    fontsize: '18',
    width: '100%',
    marginTop: '50px',
    marginLeft: '30vw'
})

const SubContainer = styled(Box)({
    width: '100%',
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around'
})

const StyledLink = styled(Link)`
text-decoration:none;
color: inherit;
`
export const ArticleGrid = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category') || 'All'


    const getArticles = async () => {
        setIsLoading(true)
        const all_articles = await API_URLS.getArticles(category)
        if (all_articles?.isSuccess) {
            setArticles(all_articles.data)
        }
        setIsLoading(false)
    }

    // Fetch articles of selected category when category changes
    useEffect(() => {
        getArticles()
    }, [category])

    return (
        <div style={{ width: '100%' }}>
            {isLoading ?
                <SubContainer>
                    <CircularProgress />
                </SubContainer> :
                <Grid container>
                    {
                        articles && articles.length > 0 ?
                            articles.map(article => {
                                return <Grid item lg={3} sm={4} xs={12} key={article._id}>
                                    <StyledLink to={`/home/article/detailview/${article._id}`}>
                                        <ArticleSmallView article={article} />
                                    </StyledLink>
                                </Grid>
                            }) :
                            <StyledBox>
                                No data available to display
                            </StyledBox>
                    }
                </Grid>
            }
        </div>
    )
}
