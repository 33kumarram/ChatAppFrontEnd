import { Box, Typography, styled, Button, TextareaAutosize, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URLS } from '../Services/ApiUrls'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit, Delete } from '@mui/icons-material'
import { useSelector } from 'react-redux'
//comments
import { WriteComment } from './comments/writeComment'
import { CommentList } from './comments/commentList'
import { CustomAlert } from '../customAlerts/customAlert'

const Container = styled(Box)(({ theme }) => ({
    margin: '65px 100px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        margin: '10px'
    }
}))

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin:50px 0;
    font-size:18px;
    background-color:#fff;
    text-align:'justify';
    text-align-last:'center';
    border:none;
    &:focus-visible{
        outline:none
    }
    `
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const EditIcon = styled(Edit)`
margin:5px;
padding:5px;
border: 1px solid #878787;
border-radius:10px;
`

const DeleteIcon = styled(Delete)`
margin:5px;
padding:5px;
border: 1px solid #878787;
border-radius:10px;
`
const Author = styled(Box)`
color: #878787;
margin: 20px 0;
display: flex;
justify-content: space-between;
`
const Description = styled(Typography)`
word-break: break-word;
text-align: center;
`

export const ArticleDetailView = () => {
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState()
    const [articleComments, setArticleComments] = useState([])
    const [alert, setAlert] = useState()
    const user = useSelector(state => state.user)
    const { id } = useParams()
    const navigate = useNavigate()

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

    const deleteArticle = async () => {
        try {
            const res = await API_URLS.deleteArticle(id)
            if (res.isSuccess) {
                showAlert('Article Deleted', 'success')
                setTimeout(() => { navigate('/home') }, 1000)
            }
        } catch (error) {
            let err = typeof (error.message) === 'object' ? 'Some error occurred while deleting' : error.message
            showAlert(err, 'danger')
        }
    }

    const getArticleById = async () => {
        setIsLoading(true)
        try {
            const res = await API_URLS.getArticleById(id)
            if (res.isSuccess && res.data[0]) {
                setArticle(res.data[0])
                setArticleComments(res.data[0]?.comments)
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const getComments = async () => {
        try {
            let res = await API_URLS.getCommentOfArticle(id)
            if (res.isSuccess) {
                setArticleComments(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    //Fetch article initially
    useEffect(() => {
        getArticleById()
    }, [])

    return (
        <>
            {!isLoading ?
                <Container>
                    <Image src={article?.cover_img} alt="Cover Image" />
                    {alert && <CustomAlert alert={alert} />}
                    <Box style={{ float: 'right' }}>
                        {user?.id === article?.user?._id &&
                            <>
                                <Button onClick={() => navigate('/home/article/update', { state: { update: true, article: article } })}>
                                    <EditIcon fontSize='large' color='primary' />
                                </Button>
                                <Button onClick={() => deleteArticle()}>
                                    <DeleteIcon fontSize='large' color='error' />
                                </Button>
                            </>
                        }
                    </Box>
                    <Box style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        fontSize: '36px',
                        fontWeight: '600',
                        wordBreak: 'break-word'
                    }}>
                        <Box>{article?.title}</Box>
                    </Box>
                    <Author>
                        <Typography>Author: <b>{article?.user?.name}</b></Typography>
                        <Typography>{new Date(article?.createdAt).toDateString()}</Typography>
                    </Author>
                    <Description>
                        <TextArea defaultValue={article?.description} disabled />
                    </Description>
                    <hr style={{ width: '100%' }} />
                    {article &&
                        <WriteComment article={article} getComments={getComments} />}
                    {articleComments && (articleComments.length > 0) &&
                        articleComments.map(comment => {
                            return <CommentList comment={comment} getComments={getComments} key={comment._id} />
                        })
                    }
                </Container> :
                <Container>
                    <CircularProgress style={{ margin: '20px' }} />
                </Container>
            }
        </>
    )
}
