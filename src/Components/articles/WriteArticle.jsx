import React, { useEffect, useState } from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Box, Button, CircularProgress, TextField, TextareaAutosize, styled } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URLS } from '../Services/ApiUrls';
import { CustomAlert } from '../customAlerts/customAlert'

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '10px'
    }
}))

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin:50px 0;
    font-size:18px;
    border:none;
    textAlign:justify;
    &:focus-visible{
        outline:none
    }
    `
const StyledDiv = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
})
const InputTextField = styled(TextField)`
    flex:1;
    margin:30px 0px;
    font-size: 25px;
    `

const initialArticle = {
    title: '',
    description: '',
    cover_img: 'https://images.unsplash.com/photo-1515666991427-9b0f67becfa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1589&q=80',
    user: '',
    category: '',
}


export const WriteArticle = (props) => {
    const [selectedFile, setSelectedFile] = useState('')
    // to display loader while uploading cover image
    const [isLoading, setIsLoading] = useState(false)
    // to disable submit button while saving article
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [article, setArticle] = useState(initialArticle)
    const [alert, setAlert] = useState()
    const user = useSelector(state => state.user)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value })
    }

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            let response
            data?.update ?
                //to update existing article  
                response = await API_URLS.updateArticle(article._id, { title: article.title, description: article.description, cover_img: article.cover_img }) :
                //to save new article
                response = await API_URLS.saveArticle(article)
            if (response.isSuccess) {
                showAlert('Article saved successfully', 'success')
                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }
        } catch (error) {
            let err = typeof (error.message) === 'object' ? 'Some error occurred' : error.message
            showAlert(err, 'danger')
        }
        setIsSubmitting(false)
    }

    //upload image to database and get image url
    const getFile = async (selectedFile) => {
        setIsLoading(true)
        if (selectedFile) {
            const data = new FormData()
            data.append('file', selectedFile)
            data.append('name', selectedFile.name)

            // to print FormData
            // for (var key of data.entries()) {
            //     console.log(key[0] + ', ' + key[1]);
            // }

            const response = await API_URLS.uploadCoverImage(data)
            setArticle({ ...article, ['cover_img']: response?.data?.imageUrl })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getFile(selectedFile)
    }, [selectedFile])

    // set default article component initially
    useEffect(() => {
        data?.update ?
            setArticle(data?.article)
            :
            setArticle({ ...article, ['category']: category || 'All', ['user']: user.id })
    }, [])

    return (
        <Container>
            <form className='d-flex flex-column w-100' onSubmit={onSubmit} style={{ marginTop: '60px' }}>
                {!isLoading ?
                    <Image style={{ width: '100%' }} src={article?.cover_img} alt='Cover Photo' /> :
                    <CircularProgress style={{ margin: 'auto' }} />
                }
                {alert && <CustomAlert alert={alert} />}
                <div className='m-3 d-flex justify-content-center'>
                    <label htmlFor='imginput' className='form-label'><ImageSearchIcon fontSize='large' /> {article?.cover_img === '' ? 'Upload cover image' : 'Update cover image'}</label>
                    <input
                        type='file'
                        accept='.png, .jpg, .jpeg'
                        name='image'
                        id='imginput'
                        onChange={(e) => {
                            setSelectedFile(e.target.files[0])
                        }}
                        style={{ display: 'none' }}
                        className="form-control"
                    />
                </div>
                <StyledDiv>
                    <InputTextField
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={article?.title}
                        onChange={(e) => handleChange(e)}
                        variant='standard'
                        className="form-control h1"
                        required />
                    <Button
                        variant='contained'
                        style={{ height: '40px' }}
                        disabled={isSubmitting || isLoading}
                        type='submit'>
                        {
                            data?.update ?
                                'Update' :
                                'Publish'
                        }
                    </Button>
                </StyledDiv>
                <TextArea
                    minRows={5}
                    placeholder='Click here to write article'
                    name='description'
                    defaultValue={article.description}
                    onChange={(e) => handleChange(e)}
                    required />
            </form>
        </Container>
    )
}
