import React from 'react'
import { Grid } from '@mui/material'
import { Banner } from './Banner'
import { CategoryListDisplay } from './CategoryListDisplay'
import { ArticleGrid } from '../articles/articleGrid'

export const HomePage = () => {


  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <CategoryListDisplay />
        </Grid>
        <Grid container item lg={10} sm={10} xs={12}>
          <ArticleGrid/>
        </Grid>
      </Grid>
    </>
  )
}
