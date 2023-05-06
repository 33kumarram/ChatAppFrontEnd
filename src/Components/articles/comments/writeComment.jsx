import { Box, TextareaAutosize, Button, styled } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { API_URLS } from '../../Services/ApiUrls';
import { useSelector } from 'react-redux';

const Container = styled(Box)({
  marginTop: '100px',
  display: 'flex'
})
const StyledTextArea = styled(TextareaAutosize)({
  width: '100%',
  height: '80px',
  margin: '0 20px'
})

export const WriteComment = ({ article, getComments }) => {
  const user = useSelector(state => state.user)
  //to disable button while submitting the comment
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comment, setComment] = useState({
    article_id: article?._id,
    commenter_name: user?.name,
    commenter_user_id: user?.id,
    comment_text: ''
  })

  const saveComment = async (comment) => {
    setIsSubmitting(true)
    const res = await API_URLS.saveNewComment(comment)
    if (res.isSuccess) {
      setComment({ ...comment, ['comment_text']: '' })
      //Get updated comment list
      await getComments()
    }
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <AccountCircleIcon size='large' />
      <StyledTextArea
        name='comment_text'
        minRows={2}
        value={comment?.comment_text}
        placeholder="What's in your mind ?"
        onChange={(e) => { handleChange(e) }}
      />
      <Button
        variant='contained'
        size='medium'
        disabled={isSubmitting}
        style={{ height: '40px' }}
        onClick={() => saveComment(comment)}>
        Post
      </Button>
    </Container>
  )
}
