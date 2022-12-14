/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit'
import { apiPoke, apiPokeByName, apiPokeByUrl } from '../actions/home.action'
import { IPokemons, ISprites, IStats } from '../interfaces'
import { getApiPokemonByName } from '../services'

interface IHomeState {
  pokemons?: IPokemons
  stats: IStats[]
  sprites?: ISprites
  loading: boolean
  loadingPokemonInfo: boolean
  name?: string
}

const initialState: IHomeState = {
  stats: [],
  loading: false,
  loadingPokemonInfo: false,
}

const homeSlice = createSlice({
  name: 'perfilRacimos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiPoke.pending, (state) => {
        state.loading = true
      })

      .addCase(apiPoke.fulfilled, (state, action) => {
        state.pokemons = action.payload!
      })
      .addCase(apiPoke.rejected, (state) => {
        state.stats = []
      })
    builder
      .addCase(apiPokeByUrl.pending, (state) => {
        state.loading = true
      })
      .addCase(apiPokeByUrl.fulfilled, (state, action) => {
        const { results, ...rest } = action.payload!
        state.pokemons = { ...rest, results: [...(state.pokemons?.results || []), ...results] }
        state.loading = false
      })
      .addCase(apiPokeByUrl.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(apiPokeByName.pending, (state) => {
        state.loadingPokemonInfo = true
        state.sprites = undefined
        state.stats = []
      })
      .addCase(apiPokeByName.fulfilled, (state, action) => {
        state.loadingPokemonInfo = false
        state.sprites = action.payload!.sprites
        state.stats = action.payload!.stats
        state.name = action.payload!.name
      })
      .addCase(apiPokeByName.rejected, (state) => {
        state.loadingPokemonInfo = false
        state.sprites = undefined
        state.stats = []
      })
  },
})

export default homeSlice.reducer
