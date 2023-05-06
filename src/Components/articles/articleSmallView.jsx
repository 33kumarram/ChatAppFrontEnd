import { Box, Typography, styled } from '@mui/material'
import React from 'react'
// to short long content and display ... at last
import { AddElipsis } from '../Helpers/addElipsis'

const Container = styled(Box)`
border: 1px solid #d3cede;
border-radius:10px;
width:100%;
height : 350px;
margin:10px;
& > p {
  padding : 0 5px 5px 5px ;
}
`
const Image = styled('img')({
  width: '100%',
  objectFit: 'cover',
  height: '150px',
  borderRadius: '10px 10px 0 0'
})

const Text = styled(Typography)`
color:#878787;
text-align:center;
font-size:12px;
`
const Heading = styled(Typography)`
text-align:center;
font-size:18px;
font-weight:600;
color:#000;
`
const Details = styled(Typography)`
font-size:14px;
text-align:center;
word-break: break-word;
color:#000;
`

export const ArticleSmallView = ({ article }) => {
  const cover_img = article.cover_img ? article.cover_img : 'https://images.unsplash.com/photo-1515666991427-9b0f67becfa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1589&q=80'

  return (
    <Container>
      <Image src={cover_img} alt="Cover Image" />
      <Text>{article.category}</Text>
      <Heading>{AddElipsis(article.title, 20)}</Heading>
      <Text>{article?.user?.name}</Text>
      <Details>{AddElipsis(article.description, 100)}</Details>
    </Container>
  )
}
